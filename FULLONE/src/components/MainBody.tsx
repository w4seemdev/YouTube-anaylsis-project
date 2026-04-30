import Overview from "./Overview";
import type { PageKey } from "../App";
import type { JSX } from "react";
import Settings1 from "./Settings1";
import Content from "./Content";
import Analytics from "./Analytics";
import ManualEstimator from "./ManualEstimator";

interface MainProps {
  searchText: string;
  activePage: PageKey;
}

const Main = ({ activePage }: MainProps) => {
  let content: JSX.Element;

  switch (activePage) {
    case "overview":
      content = <Overview />;
      break;
    case "analytics":
      content = <Analytics />;
      break;
    case "content":
      content = <Content />;

      break;
    case "settings":
      content = <Settings1 />;

      break;
    case "manual":
      content = <ManualEstimator />;
      break;
    default:
      content = <Analytics />;
  }

  return <div className="h-full">{content}</div>;
};

export default Main;
