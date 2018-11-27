import React from "react";
import { shallow } from "enzyme";
import CuratorFeed from "../CuratorFeed";

const config = {
  apiUrl: "https://api.curator.io/v1",
  apiKey: "ca1e4636-ca83-4c0a-9877-96279db7e523",
  postsToShow: 6
};

describe("CuratorFeed", () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<CuratorFeed debug config={config} />);
    expect(component).toMatchSnapshot();
  });

  it("should show Loading text by default", () => {
    const component = shallow(<CuratorFeed debug config={config} />);
    expect(
      component
        .find("p")
        .text()
        .toLowerCase()
    ).toContain("loading");
  });
});
