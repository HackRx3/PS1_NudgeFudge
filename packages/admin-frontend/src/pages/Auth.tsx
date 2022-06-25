import { Form, Formik, FormikHandlers } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { Input } from "../components/shared";

interface AuthProps {
  isLogin?: boolean;
}

const AuthPage = ({ isLogin = false }: AuthProps) => {
  const [loading, setLoading] = useState(false);
  const initialValues = {
    email: "",
    password: "",
  };

  const loginValidationSchema = Yup.object().shape({
    email: Yup.string()
      .trim()
      .email("Invalid email address")
      .required("Required"),
    password: Yup.string()
      .min(8, "Password should be atleast 8 characters long")
      .required("Required"),
  });

  return (
    <main className="px-4 py-6 min-h-screen grid bg-offWhite place-items-center">
      <section className="p-6 rounded-md border bg-white w-full max-w-lg">
        <h1 className="text-center text-3xl mb-6 font-semibold text-primary-300">
          {process.env.REACT_APP_NAME}
        </h1>
        <Formik
          initialValues={initialValues}
          validationSchema={loginValidationSchema}
          onSubmit={async (values) => {
            try {
              setLoading(true);
              console.log(values);
              // await postFeedback(values);
              // toast.success("Thank you for your feedback! 🥰", {
              //   position: "top-center",
              //   autoClose: 5000,
              //   hideProgressBar: false,
              //   closeOnClick: true,
              //   pauseOnHover: true,
              //   draggable: true,
              //   progress: undefined,
              // });
            } catch (err) {
              // console.log(err);
              // Toast(false, "Uh oh! We are facing some issues. Please again later!");
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
                  {...getFieldProps("email")}
                  type="text"
                  placeholder="Enter email"
                />
                <div className="text-red-500 text-xs font-semibold mt-1">
                  {touched.email && errors.email}
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
                className="bg-primary-300 px-6 py-2 text-white font-semibold rounded mt-2"
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
