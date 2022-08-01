import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  tailwindColumnSize?: number;
};

const Section = ({ children, tailwindColumnSize }: Props) => {
  return <section className={`${tailwindColumnSize}`}>{children}</section>;
};

export default Section;
