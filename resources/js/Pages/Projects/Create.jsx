import DangerButton from "@/Components/DangerButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

const Create = () => {
  const { data, setData, post, processing, errors } = useForm({
    name: "",
    description: "",
    image: "",
    due_date: "",
    status: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("projects.store"));
  };

  return (
    <AuthenticatedLayout
      header={
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            New Project
          </h2>
        </div>
      }
    >
      <Head title="New Project" />

      <div className="py-12">
        <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="px-6 text-gray-900 dark:text-gray-100">
              <div>
                <form
                  onSubmit={handleSubmit}
                  className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
                >
                  <div className="mx-auto space-y-6">
                    <div>
                      <InputLabel value="Image" htmlFor="image" />
                      <TextInput
                        type="file"
                        name="image"
                        id="image"
                        className="w-full"
                        onChange={(e) => setData("image", e.target.files[0])}
                      />
                    </div>
                    <div>
                      <InputLabel value="Name" htmlFor="name" />
                      <TextInput
                        name="name"
                        id="name"
                        className="w-full"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                      />
                      <InputError message={errors.name} />
                    </div>
                    <div>
                      <InputLabel value="Description" htmlFor="description" />
                      <TextAreaInput
                        name="description"
                        id="description"
                        className="w-full"
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                      />
                      <InputError message={errors.description} />
                    </div>
                    <div>
                      <InputLabel value="Deadline" htmlFor="due_date" />
                      <TextInput
                        type="date"
                        name="due_date"
                        id="due_date"
                        className="w-full"
                        value={data.due_date}
                        onChange={(e) => setData("due_date", e.target.value)}
                      />
                      <InputError message={errors.due_date} />
                    </div>
                    <div>
                      <InputLabel value="Status" htmlFor="status" />
                      <SelectInput
                        name="status"
                        id="status"
                        className="w-full"
                        onChange={(e) => setData("status", e.target.value)}
                      >
                        <option value="">Select Status</option>
                        <option value="pending">Pending</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </SelectInput>
                    </div>
                    <div className="flex justify-end items-center space-x-3">
                      <PrimaryButton type="submit">
                        Create Project
                      </PrimaryButton>
                      <Link href={route("projects.index")}>
                        <DangerButton>Cancel</DangerButton>
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Create;
