import { Children } from "react";

const useChildren = (
  children: JSX.Element | JSX.Element[],
  validTypes?: any[]
) => {
  if (validTypes) {
    Children.map(children, (child) => {
      if (!validTypes.includes(child.type)) {
        // throw Error(`children should be in [${validTypes.map((t) => t.name)}]`);
      }
    });
  }
  return Children.toArray(children);
};

export { useChildren };
