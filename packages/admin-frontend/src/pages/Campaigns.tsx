import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { Form, Formik } from "formik";

import { AiOutlineClose } from "react-icons/ai";
import { BsPlusLg } from "react-icons/bs";
import { MdCampaign } from "react-icons/md";

import { Input } from "../components/shared";
import { NUDGE_TYPES } from "../services/constants";

const initialValues = {
  label: "",
  type: "",
};

const Campaigns = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <main className="flex-1">
      <header className="bg-primary-500 flex items-center justify-between py-3 px-4 text-white">
        <h1 className="text-xl font-semibold">Campaigns</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-primary-300 filter transition-all hover:brightness-110 active:brightness-95 px-6 py-2 text-white font-semibold rounded flex items-center gap-2"
        >
          <BsPlusLg size={14} />
          Add New
        </button>
      </header>

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
              <h3>Add new campaign</h3>
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
                // validationSchema={loginValidationSchema}
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
                    <MdCampaign
                      size={48}
                      className="transform -rotate-12 opacity-50 text-primary-300 mb-6"
                    />

                    <div className="self-stretch mb-2">
                      <label className="flex gap-2">
                        <div className="self-center">Name:</div>

                        <Input
                          className="flex-1"
                          {...getFieldProps("label")}
                          type="text"
                          placeholder="Enter campaign name"
                        />
                      </label>
                      <div className="text-red-500 text-xs font-semibold mt-1">
                        {touched.label && errors.label}
                      </div>
                    </div>
                    <div className="self-stretch mb-4">
                      <label className="flex gap-2">
                        <div className="self-center">Nudge Type:</div>

                        <select
                          {...getFieldProps("type")}
                          placeholder="Select a nudge type"
                          className="flex-1"
                        >
                          {/* <option value="">--Please choose an option--</option> */}
                          {NUDGE_TYPES.map((nudgeType) => (
                            <option
                              key={nudgeType}
                              className="capitalize"
                              value={nudgeType}
                            >
                              {nudgeType}
                            </option>
                          ))}
                        </select>
                      </label>
                      <div className="text-red-500 text-xs font-semibold mt-1">
                        {touched.type && errors.type}
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
            </div>
          </section>
        </main>
      </CSSTransition>
    </main>
  );
};

export default Campaigns;
