import React from "react";
import Image from "next/dist/client/image";
// import {
//   PlusIcon,
//   ChatAlt2Icon,
//   PaperClipIcon,
// } from "@heroicons/react/outline";
import PaperClipIcon from '@mui/icons-material/AttachFile';
import PlusIcon from '@mui/icons-material/AddCircleOutline';
import ChatAlt2Icon from '@mui/icons-material/Chat';
import { Draggable } from "react-beautiful-dnd";

function CardItem({ data, index }) {
  return (
    <Draggable index={index} draggableId={data.id.toString()}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white rounded-md p-3 m-3 mt-0 last:mb-0"
        >
          <label
            className={`bg-gradient-to-r
              px-2 py-1 rounded text-black text-sm
              ${
                data.priority === 0
                  ? "from-blue-300 to-blue-100"
                  : data.priority === 1
                  ? "from-green-300 to-green-100"
                  : "from-red-300 to-red-100"
              }
              `}
          >
            {data.priority === 0
              ? "Low Priority"
              : data.priority === 1
              ? "Medium Priority"
              : "High Priority"}
          </label>
          <h5 className="text-md my-3 text-lg leading-6">{data.title}</h5>
          <div className="flex justify-between">
            <div className="flex space-x-2 items-center">
              <span className="flex space-x-1 items-center">
                <ChatAlt2Icon className="w-4 h-4 text-gray-500" />
                <span>{data.chat}</span>
              </span>
              <span className="flex space-x-1 items-center">
                <PaperClipIcon className="w-4 h-4 text-gray-500" />
                <span>{data.attachment}</span>
              </span>
            </div>

            <ul className="flex space-x-3">
              {data.assignees.map((ass, index) => {
                return (
                  <li key={index}>
                    {/* <Image
                      src={ass.avt}
                      width="36"
                      height="36"
                      objectFit="cover"
                      className=" rounded-full "
                    /> */}
                  </li>
                );
              })}
              {/* <li>
                <button
                  className="border border-dashed flex items-center w-9 h-9 border-gray-500 justify-center
                    rounded-full"
                >
                  <PlusIcon className="w-5 h-5 text-gray-500" />
                </button>
              </li> */}
            </ul>
          </div>
        </div>
        
      )}
    </Draggable>
  );
}

export default CardItem;