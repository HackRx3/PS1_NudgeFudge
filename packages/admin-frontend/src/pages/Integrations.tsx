import { CopyBlock, monokai } from "react-code-blocks";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import useProjects from "../hooks/useProjects";
import { signout } from "../store/user.slice";

const Integrations = () => {
  const { app_id } = useParams();

  const { data: projects } = useProjects();

  const dispatch = useDispatch();

  const projectData = projects?.find((proj) => proj.app_id === app_id);

  return (
    <main className="flex-1">
      <header className="bg-primary-500 flex items-center justify-between py-3 px-4 text-white">
        <h1 className="text-xl font-semibold">Integration Steps</h1>
        <button
          className="ml-8 px-4 py-2"
          onClick={() => {
            dispatch(signout());
          }}
        >
          Signout
        </button>
      </header>
      <section className="p-4">
        <h2 className="text-2xl font-extrabold">{projectData?.name} </h2>
        <h3 className="mb-4 text-slate-500">
          Platform: <span className="capitalize">{projectData?.platform}</span>
        </h3>
        <p>
          In order to show nudges on your <strong>Javascript</strong>{" "}
          application, please follow these steps
        </p>
        <p>
          Copy this script tag inside the body of your application html pages
          after everything else.
        </p>
        <div className="mt-4 break-words break-all">
          <CopyBlock
            wrapLines
            language="html"
            text={`<script src="https://nudgelab.jagnani73.com/api/v1/nudge/campaign.js" data-app-id="${app_id}"></script>`}
            codeBlock
            theme={monokai}
            showLineNumbers={false}
          />
        </div>
      </section>
    </main>
  );
};

export default Integrations;
