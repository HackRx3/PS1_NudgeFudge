import { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import * as Yup from "yup";

import { BsPlusLg } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { Form, Formik } from "formik";
import { Input } from "../components/shared";
import { signout } from "../store/user.slice";
import { useDispatch } from "react-redux";
import { createProject, fetchAllProjects } from "../services/api";
import useAuth from "../hooks/useAuth";

const initialValues = {
  name: "",
  platform: "javascript",
};

const validationSchema = Yup.object().shape({
  name: Yup.string().trim().required("Required"),
  platform: Yup.string().trim().required("Required"),
});

const Projects = () => {
  const [projects, setProjects] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const auth = useAuth();

  const dispatch = useDispatch();

  useEffect(() => {
    fetchAllProjects(auth.user?.token!).then((res) => {
      setProjects(res.data);
    });
  }, []);

  return (
    <main className="flex-1">
      <header className="bg-primary-500 flex items-center py-3 px-4 text-white">
        <h1 className="text-xl font-semibold mr-auto">Projects</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-primary-300 filter transition-all hover:brightness-110 active:brightness-95 px-6 py-2 text-white font-semibold rounded flex items-center gap-2"
        >
          <BsPlusLg size={14} />
          Create new
        </button>
        <button
          className="ml-8 px-4 py-2"
          onClick={() => {
            dispatch(signout());
          }}
        >
          Signout
        </button>
      </header>
      <section>
        {projects.map(
          (proj: { name: string; platform: string; app_id: string }) => (
            <article key={proj.app_id}>
              <div>{proj.name}</div>
              <div>{proj.platform}</div>
            </article>
          )
        )}
      </section>

      <CSSTransition
        in={modalOpen}
        classNames="modal"
        timeout={300}
        unmountOnExit
      >
        {/* backdrop */}
        <main className="fixed inset-0 p-4 z-10 grid place-items-center">
          <div
            onClick={() => {
              // formik.resetForm();
              setModalOpen(false);
            }}
            className="absolute inset-0 z-0 backdrop"
          />
          {/* content */}
          <section className="w-full z-10 max-w-xl max-h-full bg-white rounded-lg overflow-hidden flex flex-col">
            {/* <Form> */}
            <header className="px-4 py-2 border-b border-gray-300 flex justify-between items-center">
              <h3>Create new Project</h3>

              <button
                onClick={(e) => {
                  // formik.resetForm();
                  setModalOpen(false);
                }}
                className="ml-8"
              >
                <AiOutlineClose />
              </button>
            </header>

            <div className="py-4 px-6 min-h-0 overflow-y-auto">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values) => {
                  try {
                    setLoading(true);
                    const res = await createProject(
                      values.name,
                      values.platform,
                      auth.user?.token!
                    );
                    // save returned doc into local state
                    setModalOpen(false);
                  } finally {
                    setLoading(false);
                  }
                }}
              >
                {({ touched, errors, getFieldProps }) => (
                  <Form className="flex flex-col items-center">
                    <div className="self-stretch mb-2">
                      <label className="flex gap-2">
                        <div className="self-center">Project Name:</div>

                        <Input
                          className="flex-1"
                          {...getFieldProps("name")}
                          type="text"
                          placeholder="Enter Project Name"
                        />
                      </label>
                      <div className="text-red-500 text-xs font-semibold mt-1">
                        {touched.name && errors.name}
                      </div>
                    </div>
                    <div className="self-stretch mb-4">
                      <label className="flex gap-2">
                        <div className="self-center">Project Stack:</div>
                        <Input
                          disabled
                          className="flex-1"
                          {...getFieldProps("platform")}
                          type="text"
                          placeholder="Select your project platform name"
                        />
                      </label>
                      <div className="text-red-500 text-xs font-semibold mt-1">
                        {touched.platform && errors.platform}
                      </div>
                    </div>

                    <button
                      className="bg-primary-300 filter transition-all hover:brightness-110 active:brightness-95 px-6 py-2 text-white font-semibold rounded mt-2"
                      type="submit"
                      disabled={loading}
                    >
                      {!loading ? "Add" : "Please wait..."}
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </section>
        </main>
      </CSSTransition>
    </main>
  );
};

export default Projects;
