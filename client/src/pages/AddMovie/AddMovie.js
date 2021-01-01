import React from 'react';
import { Col, Row, Container, Button, Image } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { FaClock, FaFilm, FaAddressCard, FaInfo, FaLink, FaImage } from 'react-icons/fa';
//components
import Input from '../../components/Input/Input';
import TextArea from '../../components/TextArea/TextArea';

const FILE_SIZE = 3 * 1000000; //3MB
const SUPPORTED_IMAGE_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

const validationSchema = yup.object().shape({
    title: yup.string().required('Title is required.'),
    genre: yup.string().required('Genre is required'),
    trailerLink: yup.string().required('Trailer link is required.'),
    hours: yup
        .number()
        .required('Hours is required.')
        .positive('Must be positive.')
        .integer('Must be an integer.')
        .min(0, 'Minimum is 0.'),
    minutes: yup
        .number()
        .required('Minutes is required.')
        .positive('Must be an intbe postive.')
        .integer('Must eger.')
        .min(0, 'Minimum is 0.')
        .max(59, 'Maximum is 59.'),
    description: yup.string().required('Description is required.'),
    file: yup
        .mixed()
        .required('A image is required')
        .test(
            'fileSize',
            'File is too large (max: 3MB)',
            (value) => value && value.size <= FILE_SIZE
        )
        .test(
            'fileFormat',
            'Format must be jpg, jpeg, png',
            (value) => value && SUPPORTED_IMAGE_FORMATS.includes(value.type)
        )
});

const initialValues = {
    title: '',
    genre: '',
    trailerLink: '',
    hours: '',
    minutes: '',
    description: '',
    file: ''
};

const AddMovie = () => {
    return (
        <div className="p-5">
            <h1 className="text-center mb-3">Add New Movie</h1>
            <Container>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={async (values, { setSubmitting }) => {
                        setSubmitting(true);

                        setSubmitting(false);
                    }}
                >
                    {({ setFieldValue, handleBlur, errors, values, isSubmitting, touched }) => (
                        <Form>
                            <Field
                                name="title"
                                type="input"
                                as={Input}
                                label="Title"
                                Icon={FaFilm}
                                placeholder="Enter title"
                                error={touched['title'] && errors['title']}
                                className="mb-1"
                            />
                            <Row>
                                <Col>
                                    <Field
                                        name="genre"
                                        type="input"
                                        as={Input}
                                        label="Genre"
                                        Icon={FaAddressCard}
                                        placeholder="Enter genre"
                                        error={touched['genre'] && errors['genre']}
                                        className="mb-1"
                                    />
                                </Col>
                                <Col>
                                    <Field
                                        name="trailerLink"
                                        type="url"
                                        as={Input}
                                        label="Trailer Link"
                                        Icon={FaLink}
                                        placeholder="Enter trailer link"
                                        error={touched['trailerLink'] && errors['trailerLink']}
                                        className="mb-1"
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Field
                                        name="hours"
                                        type="number"
                                        min={0}
                                        as={Input}
                                        label="Hours"
                                        Icon={FaClock}
                                        placeholder="Enter hours"
                                        error={touched['hours'] && errors['hours']}
                                        className="mb-1"
                                    />
                                </Col>
                                <Col>
                                    <Field
                                        name="minutes"
                                        type="number"
                                        min={0}
                                        max={59}
                                        as={Input}
                                        label="Minutes"
                                        Icon={FaClock}
                                        placeholder="Enter minutes"
                                        error={touched['minutes'] && errors['minutes']}
                                        className="mb-1"
                                    />
                                </Col>
                            </Row>
                            <Input
                                name="file"
                                type="file"
                                label="Cover Image"
                                Icon={FaImage}
                                onChange={(event) => {
                                    setFieldValue('file', event.currentTarget.files[0]);
                                }}
                                onBlur={handleBlur}
                                placeholder="Upload cover image"
                                error={touched['file'] && errors['file']}
                                className="mb-1"
                            />
                            <Field
                                name="description"
                                type="text"
                                min={0}
                                rows={3}
                                as={TextArea}
                                label="Description"
                                Icon={FaInfo}
                                placeholder="Enter description"
                                error={touched['description'] && errors['description']}
                                className="mb-1"
                            />

                            <Button
                                disabled={isSubmitting}
                                type="submit"
                                variant="danger"
                                size="lg"
                                block
                                className="mt-3"
                            >
                                Add movie
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Container>
        </div>
    );
};

export default AddMovie;
