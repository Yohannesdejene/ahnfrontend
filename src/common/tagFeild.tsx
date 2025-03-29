import { useState, ChangeEvent } from "react";

interface iTag {
  tags: string[];
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
  maxTags: number;
}

export const TagField = ({ tags, addTag, removeTag, maxTags }: iTag) => {
  // track the use input

  const [userInput, setUserInput] = useState<string>(" ");

  // Handle input onChange

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  // handle Enter key press

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission or new line creation

      if (
        userInput.trim() !== "" &&
        userInput.length == 8 &&
        tags.length < maxTags
      ) {
        addTag(userInput);
        setUserInput(""); // Clear the input after adding a tag
      }
    }
  };

  return (
    <div className="flex w-[300px] flex-col md:w-[400px]">
      <input
        name="keyword_tags"
        type="text"
        placeholder={
          tags.length < maxTags
            ? "Add a awb/gwb"
            : `You can only enter max. of ${maxTags} tags`
        }
        className="border-gray-300 w-full rounded-md border px-4 py-2"
        onKeyDown={handleKeyPress}
        onChange={handleInputChange}
        value={userInput}
        disabled={tags.length === maxTags}
      />

      {/* ===== Render the tags here ===== */}

      <div className="mt-4 flex flex-row flex-wrap gap-3">
        {tags.map((tag: string, index: number) => (
          <span
            key={`${index}-${tag}`}
            className="mr-2 inline-flex items-start justify-start rounded-[32px] bg-blue-100 px-3 py-2 text-sm font-medium text-blue-800 shadow-sm"
          >
            {tag}
            <button
              className="ml-2 hover:text-blue-500"
              onClick={() => removeTag(tag)}
              title={`Remove ${tag}`}
            >
              &times;
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};
