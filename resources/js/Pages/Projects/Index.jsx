import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import React, { useEffect } from "react";
import TableHeading from "@/Components/TableHeading";
import PrimaryButton from "@/Components/PrimaryButton";

const Index = ({ projects, queryParams = null }) => {
  //FLASH MESSAGE
  const { flash } = usePage().props;

  queryParams = queryParams || {};

  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }
    router.get(route("projects.index"), queryParams);
  };

  const onKeyPress = (name, e) => {
    if (e.key !== "Enter") return;

    searchFieldChanged(name, e.target.value);
  };

  const sortChanged = (name) => {
    if (name === queryParams.sort_field) {
      if (queryParams.sort_direction === "asc") {
        queryParams.sort_direction = "desc";
      } else {
        queryParams.sort_direction = "asc";
      }
    } else {
      queryParams.sort_field = name;
      queryParams.sort_direction = "asc";
    }

    router.get(route("projects.index"), queryParams);
  };

  const deleteProject = (projectId) => {
    if (!window.confirm("Are you sure you want to delete this project?")) {
      return;
    }

    router.delete(route("projects.destroy", projectId));
  };

  return (
    <AuthenticatedLayout
      header={
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            Projects
          </h2>
          {flash.message && (
            <div className="text-white px-3 py-1 bg-green-400 rounded-lg">
              {flash.message}
            </div>
          )}
          <Link href={route("projects.create")}>
            <PrimaryButton>New Project</PrimaryButton>
          </Link>
        </div>
      }
    >
      <Head title="Projects" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="text-gray-900 dark:text-gray-100">
              <div>
                <div className="overflow-auto">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                      <tr className="text-nowrap">
                        <TableHeading
                          name="id"
                          sort_field={queryParams.sort_field}
                          sort_direction={queryParams.sort_direction}
                          sortChanged={sortChanged}
                        >
                          ID
                        </TableHeading>
                        <TableHeading name="image_path" sortable={false}>
                          Image
                        </TableHeading>
                        <TableHeading
                          name="name"
                          sort_field={queryParams.sort_field}
                          sort_direction={queryParams.sort_direction}
                          sortChanged={sortChanged}
                        >
                          Name
                        </TableHeading>
                        <TableHeading
                          name="status"
                          sort_field={queryParams.sort_field}
                          sort_direction={queryParams.sort_direction}
                          sortChanged={sortChanged}
                        >
                          Status
                        </TableHeading>
                        <TableHeading
                          name="created_at"
                          sort_field={queryParams.sort_field}
                          sort_direction={queryParams.sort_direction}
                          sortChanged={sortChanged}
                        >
                          Create Date
                        </TableHeading>
                        <TableHeading
                          name="due_date"
                          sort_field={queryParams.sort_field}
                          sort_direction={queryParams.sort_direction}
                          sortChanged={sortChanged}
                        >
                          Due Date
                        </TableHeading>
                        <TableHeading
                          name="created_by"
                          sort_field={queryParams.sort_field}
                          sort_direction={queryParams.sort_direction}
                          sortChanged={sortChanged}
                        >
                          Created By
                        </TableHeading>
                        <th className="p-3">Actions</th>
                      </tr>
                    </thead>
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                      <tr className="text-nowrap">
                        <th className="p-3"></th>
                        <th className="p-3"></th>
                        <th className="p-3">
                          <TextInput
                            defaultValue={queryParams.name}
                            className="w-full"
                            placeholder="Enter Project Name"
                            onBlur={(e) =>
                              searchFieldChanged("name", e.target.value)
                            }
                            onKeyPress={(e) => onKeyPress("name", e)}
                          />
                        </th>
                        <th className="p-3">
                          <SelectInput
                            className="w-full"
                            defaultValue={queryParams.status}
                            onChange={(e) =>
                              searchFieldChanged("status", e.target.value)
                            }
                          >
                            <option value="">Select Status</option>
                            <option value="pending">Pending</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                          </SelectInput>
                        </th>
                        <th className="p-3"></th>
                        <th className="p-3"></th>
                        <th className="p-3"></th>
                        <th className="p-3"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {projects.data.map((project) => (
                        <tr
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                          key={project.id}
                        >
                          <td className="p-3">{project.id}</td>
                          <td className="p-3">
                            {project.image_path && (
                              <img
                                src={project.image_path}
                                alt={project.name}
                                width={100}
                              />
                            )}
                          </td>
                          <td className="p-3 text-nowrap">
                            <Link
                              href={route("projects.show", project.id)}
                              className="hover:underline hover:text-white"
                            >
                              {project.name}
                            </Link>
                          </td>
                          <td className="p-3">
                            <span
                              className={`px-2 py-1 rounded-lg text-white ${
                                PROJECT_STATUS_CLASS_MAP[project.status]
                              }`}
                            >
                              {PROJECT_STATUS_TEXT_MAP[project.status]}
                            </span>
                          </td>
                          <td className="p-3 text-nowrap">
                            {project.created_at}
                          </td>
                          <td className="p-3 text-nowrap">
                            {project.due_date}
                          </td>
                          <td className="p-3">{project.created_by.name}</td>
                          <td className="p-3 text-nowrap">
                            <Link
                              href={route("projects.edit", project.id)}
                              className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() => deleteProject(project.id)}
                              className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Pagination links={projects.meta.links} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Index;
