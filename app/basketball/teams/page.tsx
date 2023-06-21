'use client';
import {Card, Grid, Link, Row, Text} from "@nextui-org/react";
import nextConfig from '@/next.config';

type bbTeam = {
    id: number;
    name: string;
    shortname: string;
    captain: string;
    email: string;
    tel: string;
    wechat: string;
    description: string;
    logosrc: string;
    photosrc: string;
}
export default async function Page() {
    const res = await fetch(nextConfig.BackendUrl + '/teams');
    const teamsData = await res.json();
    console.log(teamsData);
    return (
        <Grid.Container gap={2} justify="flex-start">
            {teamsData.data.map((team: bbTeam, index: React.Key) => (
                <Grid xs={6} sm={3} key={index}>
                    <Card
                        onClick={() => {
                        window.open(nextConfig.FrontendUrl + '/basketball/teams/' + team.id);
                    }}
                    isPressable isHoverable>
                        <Card.Body css={{ p: 0 }}>
                            <Card.Image
                                src={team.photosrc}
                                objectFit="cover"
                                width="100%"
                                height={140}
                                alt={team.name}
                            />
                        </Card.Body>

                        <Card.Footer css={{ justifyItems: "flex-start" }}>
                            <Row wrap="wrap" justify="space-between" align="center">
                                <Text b>{team.shortname}</Text>
                                <Text css={{ color: "$accents7", fontWeight: "$semibold", fontSize: "$sm" }}>
                                    {"Captain: " + team.captain}
                                </Text>
                            </Row>
                        </Card.Footer>
                    </Card>
                </Grid>
            ))}
        </Grid.Container>
    );
    // return (
    //     <table>
    //         <thead>
    //         <tr>
    //             <th>ID</th>
    //             <th>Name</th>
    //             <th>Short Name</th>
    //             <th>Captain</th>
    //             <th>Email</th>
    //             <th>Telephone</th>
    //             <th>WeChat</th>
    //             <th>Description</th>
    //             <th>Logo</th>
    //             <th>Photo</th>
    //         </tr>
    //         </thead>
    //         <tbody>
    //         {jsonArray.data.map((item: bbTeam) => (
    //             <tr key={item.id}>
    //                 <td>{item.id}</td>
    //                 <td>{item.name}</td>
    //                 <td>{item.shortname}</td>
    //                 <td>{item.captain}</td>
    //                 <td>{item.email}</td>
    //                 <td>{item.tel}</td>
    //                 <td>{item.wechat}</td>
    //                 <td>{item.description}</td>
    //                 <td>
    //                     <img src={item.logosrc} alt="Logo" width="50" height="50" />
    //                 </td>
    //                 <td>
    //                     <img src={item.photosrc} alt="Photo" width="50" height="50" />
    //                 </td>
    //             </tr>
    //         ))}
    //         </tbody>
    //     </table>
    // );
}