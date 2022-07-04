import { useState } from "react";
import { CSSTransition } from "react-transition-group";
import * as Yup from "yup";

import { BsPlusLg } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { Form, Formik } from "formik";
import { Input } from "../components/shared";
import { signout } from "../store/user.slice";
import { useDispatch } from "react-redux";
import { createProject } from "../services/api";
import useAuth from "../hooks/useAuth";

import { SiJavascript } from "react-icons/si";
import { Link } from "react-router-dom";
import { addProject } from "../store/projects.slice";
import useProjects from "../hooks/useProjects";

import { ReactComponent as EmptyProject } from "../assets/svg/empty-projects.svg";

const initialValues = {
  name: "",
  platform: "javascript",
};

const validationSchema = Yup.object().shape({
  name: Yup.string().trim().required("Required"),
  platform: Yup.string().trim().required("Required"),
});

const Projects = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const auth = useAuth();
  const dispatch = useDispatch();
  const { data: projects } = useProjects();

  return (
    <main className="flex-1 flex flex-col min-h-screen">
      <header className="bg-primary-500 flex items-center py-3 px-4 text-white">
        <h1 className="text-xl font-semibold mr-auto">Your Projects</h1>
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
      <section className="flex-1 bg-offWhite py-6 flex flex-col px-4">
        {projects.length > 0 ? (
          <div className="w-full flex items-start flex-wrap max-w-5xl mx-auto">
            {projects.map((proj) => (
              <div
                className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
                key={proj.app_id}
              >
                <Link
                  to={proj.app_id}
                  className="block border border-slate-300 shadow-md transition-shadow hover:shadow-lg p-6 bg-gradient-to-br from-slate-100 to-slate-300 rounded-md"
                >
                  <div className="text-">{proj.name}</div>
                  <SiJavascript
                    size={24}
                    className="block mt-6 ml-auto bg-black"
                    style={{ color: "#efd81d" }}
                  />
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex-1 flex flex-col justify-center items-center">
            <EmptyProject className="w-1/2 max-w-xs h-auto" />
            <h3 className="text-lg font-semibold mt-6 text-center text-slate-400">
              No Projects found. Start by creating one.
            </h3>
            <button
              onClick={() => setModalOpen(true)}
              className="mt-4 bg-primary-300 filter transition-all hover:brightness-110 active:brightness-95 px-6 py-2 text-white font-semibold rounded flex items-center gap-2"
            >
              <BsPlusLg size={14} />
              Create new
            </button>
          </div>
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
                    if (res) {
                      dispatch(
                        addProject({
                          name: values.name,
                          platform: values.platform,
                          app_id: res.data.app_id,
                        })
                      );
                    }
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
