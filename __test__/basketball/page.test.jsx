/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import Page from "@/app/basketball/page";
import { beforeEach } from "node:test";
import fetchMock from "jest-fetch-mock";

// Mock useRouter:
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null
    };
  }
}));

describe("Home", () => {
  beforeEach(() => {
    jest.mock("next/navigation", () => ({
      useRouter: jest.fn(),
    }));
    fetchMock.resetMocks();
    process.env.NEXT_PUBLIC_SITE_URL = "http://localhost:3000";
  });

  it("renders the basic page", async () => {
    const seasonMock = {
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
      ],
    };

    const newsMock = {
      total: 1,
      limit: 3,
      skip: 0,
      data: [
        {
          id: 30,
          seasonid: 18,
          matchid: null,
          playerid: null,
          category: "bb_result",
          title: "Game Result",
          content:
            "男篮公开组第21赛季[常规赛]: in the game on 2024-06-22 at 13:00:00, team 67ers beat team 西南联队 with a score of 42:33.",
          image:
            "http://svcsa.org/uploads/20220820/3594e9ca97e6b16d64f058b0c53fcbdf.pdf",
        },
      ],
    };
    fetchMock.mockIf(/basketball\/news/, (req) => {
      return Promise.resolve({
        body: JSON.stringify(newsMock),
        headers: { "content-type": "application/json" },
      });
    });

    fetchMock.mockIf(/basketball\/active-season/, (req) => {

      return Promise.resolve({
        body: JSON.stringify(seasonMock),
        headers: { "content-type": "application/json" },
      });
    });
    const serverComponent = await Page();
    const { container } = render(serverComponent);

    const heading = screen.getByText("Explore SVCSA 🏀");

    expect(heading).toBeInTheDocument();

    const quickLinks = screen.getAllByTestId("quick-links");

    expect(quickLinks.length).toBe(1);
    const competitionLinks = screen.getAllByTestId("competition-links");

    expect(competitionLinks.length).toBe(3);
    expect(container).toMatchSnapshot();
  });
});
