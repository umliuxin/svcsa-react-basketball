export async function GET() {
  const data = [
    {
      id: 24,
      name: "男篮2024-2025赛季",
      starttime: "2024-09-13T00:00:00.000Z",
      teamnumber: 24,
      groupnumber: 2,
      playoffgroupnumber: 4,
      rules: 4,
      competitionid: 1,
      startdate: {
        month: 9,
        day: 13,
        year: 2024,
      },
      competition: {
        id: 1,
        name: "SVCBA男篮",
        description: "硅谷华人男篮联赛",
        picture:
          "http://www.svcsa.org/uploads/20220415/deeb9c494c1d6cd2cf682fe978e36a02.jpg",
      },
    },
    {
      id: 25,
      name: "女篮2024-2025赛季",
      starttime: "2024-09-13T00:00:00.000Z",
      teamnumber: 8,
      groupnumber: 1,
      playoffgroupnumber: 1,
      rules: 2,
      competitionid: 2,
      startdate: {
        month: 9,
        day: 13,
        year: 2024,
      },
      competition: {
        id: 2,
        name: "SVCBA女篮",
        description: "硅谷华人篮球联赛女篮",
        picture:
          "http://www.svcsa.org/uploads/20220415/a0be11abe00633a950a7a9c8d651df5e.jpg",
      },
    },
  ];
  return Response.json({ data })

}
