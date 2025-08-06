import React, { useState, useEffect } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const types = ["Webinar", "Meetup", "Workshop"];

const EventForm = ({ onSubmit, defaultValues = {} }) => {
  const [title, setTitle] = useState(defaultValues.title || "");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [date, setDate] = useState(
    defaultValues.date ? new Date(defaultValues.date) : null
  );
  const [type, setType] = useState(defaultValues.type || "Webinar");
  const [status, setStatus] = useState(defaultValues.status || "Active");
  const [banner, setBanner] = useState(defaultValues.banner || "");

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (defaultValues.description) {
      const contentBlock = htmlToDraft(defaultValues.description);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(
          contentBlock.contentBlocks
        );
        setEditorState(EditorState.createWithContent(contentState));
      }
    }
  }, [defaultValues.description]);

  const handleImageUpload = (e) => {
    const reader = new FileReader();
    reader.onload = () => setBanner(reader.result);
    reader.readAsDataURL(e.target.files[0]);
  };

  const validateForm = () => {
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const description = draftToHtml(rawContentState);

    const newErrors = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!description || description === "<p></p>\n")
      newErrors.description = "Description is required";
    if (!date) newErrors.date = "Date is required";
    if (!banner) newErrors.banner = "Banner image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (typeof onSubmit !== "function") {
      console.error("onSubmit is not a function", onSubmit);
      return;
    }

    if (!validateForm()) return;

    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const description = draftToHtml(rawContentState);

    onSubmit({ title, description, date, type, status, banner });
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-4 sm:px-6 lg:px-8 overflow-visible">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 rounded-2xl shadow-xl relative z-0"
      >
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter event title"
            className={`w-full border px-4 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description <span className="text-red-500">*</span>
          </label>
          <div
            className={`border rounded-md ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
          >
            <Editor
              editorState={editorState}
              onEditorStateChange={setEditorState}
              wrapperClassName="rounded-md"
              editorClassName="px-3 py-2 min-h-[150px]"
              toolbarClassName="border-b"
            />
          </div>
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date <span className="text-red-500">*</span>
          </label>
          <DatePicker
            selected={date}
            onChange={setDate}
            className={`w-full border px-4 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none ${
              errors.date ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.date && (
            <p className="text-red-500 text-sm mt-1">{errors.date}</p>
          )}
        </div>

        {/* Type */}
        <div className="relative w-full z-10">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
          >
            {types.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div className="flex items-center space-x-3">
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <label className="inline-flex items-center space-x-2">
            <input
              type="checkbox"
              checked={status === "Active"}
              onChange={() =>
                setStatus(status === "Active" ? "Cancelled" : "Active")
              }
              className="accent-blue-600"
            />
            <span
              className={`text-sm font-medium ${
                status === "Active" ? "text-green-600" : "text-red-500"
              }`}
            >
              {status}
            </span>
          </label>
        </div>

        {/* Banner Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Banner Image <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0 file:font-semibold
            file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {errors.banner && (
            <p className="text-red-500 text-sm mt-1">{errors.banner}</p>
          )}
          {banner && (
            <img
              src={banner}
              alt="Preview"
              className="mt-4 w-full max-w-sm h-auto rounded-lg shadow-md object-cover"
            />
          )}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold px-6 py-2 rounded-full hover:from-blue-700 hover:to-indigo-700 transition duration-200 shadow-lg"
          >
            Save Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
