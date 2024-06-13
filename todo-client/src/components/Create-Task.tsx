import React, { useRef } from "react";
import { IAddTask, ITask } from "../interface";
import { addTask } from "../redux/taskSlice";
import { useNavigate } from "react-router-dom";
import { AddTask } from "../requests";
import { useDispatch } from "react-redux";

export default function CreateTask() {
  const descriptionElement = useRef<HTMLTextAreaElement>(null);
  const titleElement = useRef<HTMLInputElement>(null);
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    const postObj: IAddTask = {
      title: titleElement.current?.value ?? "",
      description: descriptionElement.current?.value ?? "",
      isCompleted: false,
    };

    const task: ITask = await AddTask(postObj);

    dispatch(addTask(task));

    if (titleElement.current) titleElement.current.value = "";
    if (descriptionElement.current) descriptionElement.current.value = "";

    navigation("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Title
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    ref={titleElement}
                    autoComplete="title"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Enter Title"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="about"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Description
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  ref={descriptionElement}
                  placeholder="Enter the description"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={""}
                />
              </div>
            </div>
          </div>
          <div className="mt-5">
            <button className="bg-green-500 rounded-sm px-2 py-1 text-white">
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
