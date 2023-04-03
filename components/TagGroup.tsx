import { useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const tags = ['Tag 1', 'Tag 2', 'Tag 3'];

export default function TagGroup({newGroupUsers, setNewGroupUsers}: any) {
  const [selectedTags, setSelectedTags] = useState<any>([]);

  const handleTagClick = (tag: any) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((selectedTag: any) => selectedTag !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleTagCloseClick = (tag: any) => {
    setSelectedTags(selectedTags.filter((selectedTag: any) => selectedTag !== tag));
  };

  return (
    <div className="flex flex-wrap gap-2">
      {newGroupUsers.map((user) => (
        <div
          key={user.id}
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            selectedTags.includes(tag)
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-800'
          }`}
          onClick={() => handleTagClick(tag)}
        >
          {tag}
          {selectedTags.includes(tag) && (
            <button
              className="flex items-center ml-2"
              onClick={(e) => {
                e.stopPropagation();
                handleTagCloseClick(tag);
              }}
            >
              <AiOutlineCloseCircle className="w-4 h-4" />
            </button>
          )}
        </div>
      ))}
    </div>
  );
}