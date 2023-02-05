import { createContext, ReactNode } from "react";

export interface IColorContextSchema {
  toggleColorMode: () => void;
}

interface IColorContextProvider {
  children: ReactNode;
  value: IColorContextSchema;
}

export const ColorContext = createContext<IColorContextSchema>(
  {} as IColorContextSchema
);

// provide a "toggleColorMode" property which is a function to toggle color mode
export const ColorContextProvider = function (props: IColorContextProvider) {
  const { value, children } = props;

  return (
    <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
  );
};
