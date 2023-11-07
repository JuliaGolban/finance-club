import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MdClose, MdDone } from 'react-icons/md';
import { Formik, Field, Form } from 'formik';
import { closeModalWindow } from 'hooks/modalWindow';
import { cleanModal } from 'redux/modal/operation';
import { modalComponent } from 'redux/modal/selectors';
import { addReload } from 'redux/reload/slice';
import { createUserData } from 'services/APIservice';
import { setImage } from 'utils/setimage';
import { onFetchError } from 'helpers/Messages/NotifyMessages';
import { onLoaded, onLoading } from 'helpers/Loader/Loader';
import css from './createDataModal.module.scss';

export const CreateUserDataModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const modal = useSelector(modalComponent);
  const dispatch = useDispatch();

  

  async function createUser(values) {
    const file = document.querySelector('#avatar')?.files[0];
    try {
      const { date } = await createUserData('/admin/users/create', values, file);
      if (date && date !== 201) {
        return onFetchError('Whoops, something went wrong');
      }
      return date;
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
      dispatch(addReload(true));
    }
  }

  const closeDataModal = e => {
    e.preventDefault();
    dispatch(cleanModal());
    closeModalWindow(e);
  };

  return createPortal(
    Object.values(modal)[0] === 'admin_create_user' && (
      <div
        className={css.backdrop}
        onClick={e => {
          if (e.currentTarget === e.target) closeDataModal(e);
        }}
      >
        <div className={css.modal} onClick={e => e.stopPropagation()}>
          <button
            className={css['close-btn']}
            type="button"
            onClick={e => closeDataModal(e)}
            aria-label="Close modal"
          >
            <MdClose size={15} />
          </button>
          {isLoading ? onLoading() : onLoaded()}
          {error && onFetchError('Whoops, something went wrong')}
          <Formik
            initialValues={{
              // id: '',
              userName: '',
              birthday: '',
              location: '',
              avatar: '',
              email: '',
              password: '',
              phone: '',
              role: 'user',
            }}
            onSubmit={(values, { setSubmitting }) => {
              createUser(values);
              dispatch(addReload(false));
              setSubmitting(false);
            }}
            enableReinitialize={true}
          >
            {({
              handleChange,
              handleSubmit,
              handleBlur,
              isSubmitting,
              values,
              errors,
              touched,
            }) => (
              <Form
                className={css.form}
                autoComplete="off"
                onSubmit={handleSubmit}
                onChange={handleChange}
              >
                <div className={css.form__list}>
                  {/* <div className={css.form__field}>
                    <label className={css.form__label} htmlFor="id">
                      ID
                    </label>
                    <Field
                      className={css.form__input}
                      id="id"
                      type="text"
                      name="id"
                      placeholder="User id"
                      disabled
                    />
                  </div> */}
                  <div className={css.form__field}>
                    <label className={css.form__label} htmlFor="userName">
                      <span>Name</span>
                      {errors.userName && touched.userName ? (
                        <span className={css.error}>{errors.userName}</span>
                      ) : null}
                    </label>
                    <Field
                      className={css.form__input}
                      type="text"
                      id="userName"
                      name="userName"
                      placeholder="Type user name"
                      value={values.userName}
                    />
                  </div>
                  <div className={css.form__field}>
                    <label className={css.form__label} htmlFor="email">
                      <span>Email</span>
                      {errors.email && touched.email ? (
                        <span className={css.error}>{errors.email}</span>
                      ) : null}
                    </label>
                    <Field
                      className={css.form__input}
                      type="text"
                      id="email"
                      name="email"
                      placeholder="Type user email"
                      value={values.email}
/>
                  </div>
                  <div className={css.form__field}>
                    <label className={css.form__label} htmlFor="password">
                      <span>Password</span>
                      {errors.password && touched.password ? (
                        <span className={css.error}>{errors.password}</span>
                      ) : null}
                    </label>
                    <Field
                      className={css.form__input}
                      type="text"
                      id="password"
                      name="password"
                      placeholder="User password"
                      value={values.password}
              />
                  </div>
                  <div className={css.form__field}>
                    <label className={css.form__label} htmlFor="phone">
                      <span>Phone</span>
                      {errors.phone && touched.phone ? (
                        <span className={css.error}>{errors.phone}</span>
                      ) : null}
                    </label>
                    <Field
                      className={css.form__input}
                      type="text"
                      id="phone"
                      name="phone"
                      placeholder="Type user phone"
                      value={values.phone}
                    />
                  </div>
                  <div className={css.form__field}>
                    <label className={css.form__label} htmlFor="birthday">
                      <span>Date of birth</span>
                      {errors.birthday && touched.birthday ? (
                        <span className={css.error}>{errors.birthday}</span>
                      ) : null}
                    </label>
                    <div style={{ position: 'relative' }}>
                      <Field
                        className={css.form__input}
                        onFocus={e => {
                          e.target.setAttribute('type', 'date');
                        }}
                        onBlur={e => {
                          e.target.setAttribute('type', 'text');
                        }}
                        type="text"
                        id="birthday"
                        name="birthday"
                        min={'1900-01-01'}
                        max={`${new Date().toISOString().split('T')[0]}`}
                        placeholder="Type day of birth"
                        value={values.birthday}
                      />
                    </div>
                  </div>
                  <div className={css.form__field}>
                    <label className={css.form__label} htmlFor="location">
                      <span>Location</span>
                      {errors.location && touched.location ? (
                        <span className={css.error}>{errors.location}</span>
                      ) : null}
                    </label>
                    <div style={{ position: 'relative' }}>
                      <Field
                        className={css.form__input}
                        type="text"
                        id="location"
                        name="location"
                        placeholder="Type location"
                        value={values.location}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className={css.form__field}>
                    <label className={css.form__label} htmlFor="avatar">
                      <span>Avatar</span>
                      {errors.avatar && touched.avatar ? (
                        <span className={css.error}>{errors.avatar}</span>
                      ) : null}
                    </label>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        gap: '4px',
                      }}
                    >
                      <Field
                          className={css['form__field-item']}
                          type="file"
                          id="avatar"
                          name="avatar"
                          accept=".jpeg,.jpg,.png,.gif"
                          onChange={e => {
                            handleChange(e);
                            setImage(e);
                          }}
                        />
                    </div>
                  </div>
                  <div className={css.form__field}>
                    <label className={css.form__label} htmlFor="role">
                      <span>role</span>
                      {errors.role && touched.role ? (
                        <span className={css.error}>{errors.role}</span>
                      ) : null}
                    </label>
                    <Field
                      className={css.form__input}
                      type="text"
                      id="role"
                      name="role"
                      placeholder="Type user role"
                      value={values.role}
                    />
                  </div>
                </div>

                <button
                  className={css['done-btn']}
                  type="submit"
                  disabled={isSubmitting}
                  aria-label="Submit"
                >
                  <MdDone size={15} />
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    ),
    document.querySelector('#popup-root'),
  );
};
