import { Link } from "@inertiajs/react";
import React from "react";

const Pagination = ({ links }) => {
  return (
    <div>
      <nav className="text-center mt-4">
        {links.map((link) =>
          link.url ? (
            <Link
              href={link.url || ""}
              key={link.label}
              dangerouslySetInnerHTML={{ __html: link.label }}
              className={`inline-block py-2 px-3 rounded-lg text-gray-200 text-sm 
                ${link.active ? "bg-gray-950" : ""} 
                ${
                  !link.url
                    ? `!text-gray-500 cursor-not-allowed`
                    : "hover:bg-gray-950"
                }`}
              preserveScroll
            ></Link>
          ) : (
            <span
              key={link.label}
              className={`inline-block py-2 px-3 rounded-lg text-sm !text-gray-500 cursor-not-allowed`}
              dangerouslySetInnerHTML={{ __html: link.label }}
            ></span>
          )
        )}
      </nav>
    </div>
  );
};

export default Pagination;
