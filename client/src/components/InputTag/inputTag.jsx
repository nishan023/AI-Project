/* eslint-disable react/prop-types */
import { useState } from "react";
import { WithContext as ReactTags } from "react-tag-input";
import "./inputTag.css";
import React from "react";

export default function InputTag({ tags, setTags }) {
  const KeyCodes = {
    comma: 188,
    enter: 13,
  };
  const handleAddTag = (tag) => {
    setTags([...tags, tag]);
  };

  const delimiters = [KeyCodes.comma, KeyCodes.enter];

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };
  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };
  return (
    <ReactTags
      tags={tags}
      delimiters={delimiters}
      handleDelete={handleDelete}
      handleAddition={handleAddition}
      inputFieldPosition="bottom"
      autocomplete
      allowDragDrop={false}
    />
  );
}
