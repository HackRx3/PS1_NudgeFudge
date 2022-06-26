import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { Form, Formik } from "formik";

import { AiOutlineClose } from "react-icons/ai";
import { BsPlusLg } from "react-icons/bs";
import { MdCampaign } from "react-icons/md";

import Field from "../components/shared/field";
import { NUDGE_TYPES } from "../services/constants";
import { useDispatch } from "react-redux";
import { signout } from "../store/user.slice";

import * as Yup from "yup";
import { createYupSchema, getInputsFromNudgeType } from "../services/utils";
import { Input } from "../components/shared";
import { getTriggerNudges, postNudge } from "../services/api";
import useAuth from "../hooks/useAuth";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

interface TriggerNudgeType {
  app_id: string;
  event_label: string | null;
  nudge: {
    config: any;
    label: string;
    type: typeof NUDGE_TYPES[number];
  };
}

const Triggers = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [triggerNudges, setTriggerNudges] = useState<any[]>([]);

  const [label, setLabel] = useState("");
  const [eventLabel, setEventLabel] = useState("");
  const [type, setType] = useState<typeof NUDGE_TYPES[number] | "">("");

  useEffect(() => {
    (async () => {
      const { data } = await getTriggerNudges(app_id as string);
      if (data) {
        setTriggerNudges(data);
      }
    })();
  }, []);

  const {
    // @ts-ignore
    user: { token },
  } = useAuth();
  const { app_id } = useParams();

  const dispatch = useDispatch();

  const handleModalClose = () => {
    setLabel("");
    setType("");
    setModalOpen(false);
  };

  return (
    <main className="flex-1 flex flex-col">
      <header className="bg-primary-500 flex items-center py-3 px-4 text-white">
        <h1 className="text-xl font-semibold mr-auto">Triggers</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-primary-300 filter transition-all hover:brightness-110 active:brightness-95 px-6 py-2 text-white font-semibold rounded flex items-center gap-2"
        >
          <BsPlusLg size={14} />
          Add New
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

      <div className="p-4 flex-1 bg-offWhite">
        {triggerNudges.length > 0 ? (
          <div className="flex flex-wrap">
            {
              // @ts-ignore
              triggerNudges.map((nudge: TriggerNudgeType, index) => (
                <div
                  key={index}
                  className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
                >
                  <article className="h-full block border cursor-default border-slate-300 px-4 py-3 shadow bg-gradient-to-br from-slate-100 to-slate-300 rounded-md">
                    <h2 className="text-lg font-semibold">
                      {nudge.nudge.label}
                    </h2>
                    <div className="text-sm">
                      <span className="font-semibold">Nudge Type: </span>
                      {nudge.nudge.type}
                    </div>
                    <code className="flex pt-4 mt-2 border-t border-slate-300 break-words">
                      {JSON.stringify(nudge.nudge.config, null, 2)}
                    </code>
                  </article>
                </div>
              ))
            }
          </div>
        ) : (
          <div>No triggers created</div>
        )}
      </div>

      <CSSTransition
        in={modalOpen}
        classNames="modal"
        timeout={300}
        unmountOnExit
      >
        {/* backdrop */}
        <main className="fixed inset-0 p-4 z-10 grid place-items-center">
          <div
            onClick={handleModalClose}
            className="absolute inset-0 z-0 backdrop"
          />
          {/* content */}
          <section className="w-full z-10 max-w-xl max-h-full bg-white rounded-lg overflow-hidden flex flex-col">
            {/* <Form> */}
            <header className="px-4 py-2 border-b border-gray-300 flex justify-between items-center">
              <h3>Add new trigger</h3>
              <button onClick={handleModalClose} className="ml-8">
                <AiOutlineClose />
              </button>
            </header>

            <div className="py-4 px-6 min-h-0 overflow-y-auto">
              <MdCampaign
                size={48}
                className="block mx-auto transform -rotate-12 opacity-50 text-primary-300 mb-6"
              />
              {/*  */}
              <label className="block mb-4">
                Trigger Name:
                <Input
                  type="text"
                  placeholder="Enter trigger name"
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  className="mt-1"
                />
              </label>
              <label className="block mb-4">
                Event Label:
                <Input
                  type="text"
                  placeholder="Enter event for which nudge is to be shown"
                  value={eventLabel}
                  onChange={(e) => setEventLabel(e.target.value)}
                  className="mt-1"
                />
              </label>
              <label className="block mb-4">
                Nudge Type:
                <select
                  onChange={(e) =>
                    setType(e.target.value as typeof NUDGE_TYPES[number])
                  }
                  value={type}
                  className="capitalize mt-1 block w-full min-w-0 px-4 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                  focus:outline-none focus:border-primary-300 focus:ring-1 focus:ring-primary-300
                  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none "
                >
                  <option disabled hidden selected value="">
                    Select Nudge Type
                  </option>
                  {NUDGE_TYPES.map((nudgeType) => (
                    <option
                      className="capitalize"
                      key={nudgeType}
                      value={nudgeType}
                    >
                      {nudgeType}
                    </option>
                  ))}
                </select>
              </label>

              <Formik
                enableReinitialize
                initialValues={{}}
                validationSchema={Yup.object().shape(
                  getInputsFromNudgeType(type).reduce(createYupSchema, {})
                )}
                onSubmit={async (values, { resetForm }) => {
                  setLoading(true);
                  await postNudge(
                    { nudge: { config: values, type, label }, app_id },
                    token
                  );
                  resetForm();
                  toast.success("Nudge added!");
                  handleModalClose();
                  setLoading(false);
                  setTriggerNudges([
                    ...triggerNudges,
                    { nudge: { config: values, type, label }, app_id },
                  ]);
                }}
              >
                {({ touched, errors, getFieldProps }) => (
                  <Form className="flex flex-col items-center">
                    {getInputsFromNudgeType(type).map((question) => (
                      <div key={question.id} className="self-stretch mb-4">
                        <Field
                          classNames={{
                            wrapper: "w-full",
                            label: "text-black mb-1 block",
                            input:
                              "block w-full min-w-0 px-4 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-primary-300 focus:ring-1 focus:ring-primary-300 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none",
                          }}
                          {...question}
                          {...getFieldProps(question.name)}
                        />

                        <div className="text-red-500 text-xs font-semibold mt-1">
                          {/* @ts-ignore */}
                          {touched[question.name] && errors[question.name]}
                        </div>
                      </div>
                    ))}
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

export default Triggers;
