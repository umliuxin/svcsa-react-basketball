/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import Page from "@/app/basketball/page";
import { beforeEach } from "node:test";
import fetchMock from "jest-fetch-mock";

describe("Home", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("renders the basic page", async () => {
    const mockData = {
      total: 12,
      limit: 3,
      skip: 0,
      data: [
        {
          id: 18,
          name: "男篮公开组第21赛季",
          starttime: "2022-09-18T00:00:00.000Z",
          teamnumber: 20,
          groupnumber: 1,
          playoffgroupnumber: 1,
          rules: 3,
          competitionid: 1,
          startdate: {
            month: 9,
            day: 18,
            year: 2022,
          },
          competition: {
            id: 1,
            name: "AlphaX杯SVCBA男篮公开组",
            description: "硅谷华人男篮联赛公开组",
            picture:
              "http://svcsa.org/uploads/20220415/deeb9c494c1d6cd2cf682fe978e36a02.jpg",
          },
        },
        {
          id: 19,
          name: "女篮公开组第7赛季",
          starttime: "2022-09-18T00:00:00.000Z",
          teamnumber: 5,
          groupnumber: 1,
          playoffgroupnumber: 1,
          rules: 2,
          competitionid: 2,
          startdate: {
            month: 9,
            day: 18,
            year: 2022,
          },
          competition: {
            id: 2,
            name: "AlphaX杯SVCBA女篮公开组",
            description: "硅谷华人篮球联赛女篮公开组",
            picture:
              "http://svcsa.org/uploads/20220415/a0be11abe00633a950a7a9c8d651df5e.jpg",
          },
        },
        {
          id: 20,
          name: "男篮壮年组第1赛季",
          starttime: "2022-09-18T00:00:00.000Z",
          teamnumber: 4,
          groupnumber: 1,
          playoffgroupnumber: 1,
          rules: 2,
          competitionid: 4,
          startdate: {
            month: 9,
            day: 18,
            year: 2022,
          },
          competition: {
            id: 4,
            name: "AlphaX杯SVCBA男篮壮年组",
            description: "硅谷华人篮球联赛男篮壮年组",
            picture:
              "http://svcsa.org/uploads/20220816/829ecc8922c42936100e634e71716684.jpg",
          },
        },
      ],
    };

    // Mock the fetch response
    fetchMock.mockResponseOnce(JSON.stringify(mockData));
    const serverComponent = await Page();
    const {container} = render(serverComponent);

    const heading = screen.getByText("Hello, basketball league page!");

    expect(heading).toBeInTheDocument();

    const standingLinks = screen.getAllByTestId("standing-link");

    expect(standingLinks.length).toBe(3);

    expect(container).toMatchSnapshot();
  });
});
