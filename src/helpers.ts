import { type PartialDeep } from "type-fest";

export const readInput = <T>(): T => {
  return JSON.parse(Host.inputString()) as T;
};

export const writeOutput = <T>(data: PartialDeep<T>) => {
  Host.outputString(JSON.stringify(data));
};

export const isValidHost = (hostName: string, domains: string[]): boolean => {
  // domains contain a *  as a simple wildcard for any number of characters
  // ie: *.stripe.com
  return domains.some((domain) => {
    const regex = new RegExp(
      `^${domain.replaceAll(".", "\\.").replace("*", ".*")}$`
    );
    return regex.test(hostName);
  });
};
