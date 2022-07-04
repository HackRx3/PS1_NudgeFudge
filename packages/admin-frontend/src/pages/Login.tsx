import { Form, Formik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Input, Logo } from "../components/shared";
import { loginUser } from "../services/api";
import { login } from "../store/user.slice";

const initialValues = {
  username: "",
  password: "",
};

const AuthPage = () => {
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  let navigate = useNavigate();
  const dispatch = useDispatch();

  let from = (location.state as any)?.from?.pathname || "/";

  const loginValidationSchema = Yup.object().shape({
    username: Yup.string().trim().required("Required"),
    password: Yup.string()
      .min(8, "Password should be atleast 8 characters long")
      .required("Required"),
  });

  return (
    <main className="px-4 py-6 min-h-screen grid bg-offWhite place-items-center">
      <section className="p-6 rounded-md border bg-white w-full max-w-lg">
        <Logo className="mb-6 h-8 w-auto block mx-auto" dark />
        <Formik
          initialValues={initialValues}
          validationSchema={loginValidationSchema}
          onSubmit={async (values) => {
            try {
              setLoading(true);
              const data = await loginUser(values);

              if (data) {
                dispatch(
                  login({ token: data.authToken, username: values.username })
                );
                navigate(from, { replace: true });
              }
            } finally {
              setLoading(false);
            }
          }}
        >
          {({ touched, errors, getFieldProps }) => (
            <Form className="flex flex-col items-center">
              <h2 className="text-2xl mb-4 text-center font-semibold">Login</h2>

              <div className="self-stretch mb-2">
                <Input
                  {...getFieldProps("username")}
                  type="text"
                  placeholder="Enter username"
                />
                <div className="text-red-500 text-xs font-semibold mt-1">
                  {touched.username && errors.username}
                </div>
              </div>
              <div className="self-stretch mb-4">
                <Input
                  {...getFieldProps("password")}
                  type="password"
                  placeholder="Enter password"
                />
                <div className="text-red-500 text-xs font-semibold mt-1">
                  {touched.password && errors.password}
                </div>
              </div>

              <button
                className="bg-primary-300 filter transition-all hover:brightness-110 active:brightness-95 px-6 py-2 text-white font-semibold rounded mt-2"
                type="submit"
                disabled={loading}
              >
                {!loading ? "Submit" : "Please wait..."}
              </button>
            </Form>
          )}
        </Formik>
      </section>
    </main>
  );
};

export default AuthPage;
