import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";
import TasksTable from "../Tasks/TasksTable";

const Show = ({ project, tasks, queryParams }) => {
  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          {`Project: ${project.name}`}
        </h2>
      }
    >
      <Head title={project.name} />
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div>
              <img
                src={project.image_path}
                alt={project.name}
                className="w-full object-cover h-64"
              />
            </div>
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="grid grid-cols-3 gap-1 mt-2 place-items-center">
                <div>
                  <div className="mt-4">
                    <label className="font-bold">Project Name</label>
                    <p className="mt-1 text-sm">{project.name}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold">Project Status</label>
                    <p className="mt-1 text-sm">
                      <span
                        className={`px-2 py-1 rounded-lg text-white ${
                          PROJECT_STATUS_CLASS_MAP[project.status]
                        }`}
                      >
                        {PROJECT_STATUS_TEXT_MAP[project.status]}
                      </span>
                    </p>
                  </div>
                </div>
                {/* ----------------------------------------------------2nd column---------------------------------------- */}
                <div>
                  <div className="mt-4">
                    <label className="font-bold">Due Date</label>
                    <p className="mt-1 text-sm">{project.due_date}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold">Create Date</label>
                    <p className="mt-1 text-sm">{project.created_at}</p>
                  </div>
                </div>
                {/* ----------------------------------------------------3rd column---------------------------------------- */}
                <div>
                  <div className="mt-4">
                    <label className="font-bold">Created By</label>
                    <p className="mt-1 text-sm">{project.created_by.name}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold">Updated By</label>
                    <p className="mt-1 text-sm">{project.updated_by.name}</p>
                  </div>
                </div>
              </div>
              <div className="mt-10 py-3 border-t">
                <p className="text-justify">{project.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* -------------------------------------------------TABLE SECTION-------------------------------------------------------------- */}
      <div className="pb-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <TasksTable
                tasks={tasks}
                queryParams={queryParams}
                hideProjectColumn={true}
              />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Show;
