"use client";
import { Disclosure, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";

const convertTypeDescription = (type) => {
  if (type === "overview") {
    return "Tổng quan";
  } else if (type === "material") {
    return "Chất liệu";
  }
  return "";
};

export default function DescriptionItem({ item }) {
  return (
    <div className="w-full pt-[1.5rem] border-b-2 border-solid border-black">
      <div className="w-full rounded-2xl bg-white p-2">
        <Disclosure defaultOpen>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-2 text-left text-[2rem] font-medium hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75 items-center">
                <span> {convertTypeDescription(item?.type)}</span>
                <ChevronUpIcon
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-purple-500`}
                />
              </Disclosure.Button>
              <Transition
                show={open}
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Disclosure.Panel
                  className="px-4 pt-4 pb-2 text-base text-gray-500"
                  static
                >
                  {item?.content}
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
}
