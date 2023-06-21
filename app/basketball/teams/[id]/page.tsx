'use client';
import nextConfig from '@/next.config.js';
import { Grid, Card, Text } from "@nextui-org/react";

export default async function Page({ params } : {
    params: { id: string }
}) {
    const res = await fetch(nextConfig.BackendUrl + '/teams/' + params.id);
    const resJson = await res.json();
    //console.log(resJson);
    // return (
    //     <table>
    //     <thead>
    //     <tr>
    //         <th>ID</th>
    //         <th>Name</th>
    //         <th>Short Name</th>
    //         <th>Captain</th>
    //         <th>Email</th>
    //         <th>Telephone</th>
    //         <th>WeChat</th>
    //         <th>Description</th>
    //         <th>Logo</th>
    //         <th>Photo</th>
    //     </tr>
    //     </thead>
    //     <tbody>
    //         <tr key={resJson.id}>
    //             <td>{resJson.id}</td>
    //             <td>{resJson.name}</td>
    //             <td>{resJson.shortname}</td>
    //             <td>{resJson.captain}</td>
    //             <td>{resJson.email}</td>
    //             <td>{resJson.tel}</td>
    //             <td>{resJson.wechat}</td>
    //             <td>{resJson.description}</td>
    //             <td>
    //                 <img src={resJson.logosrc} alt="Logo" width="50" height="50" />
    //             </td>
    //             <td>
    //                 <img src={resJson.photosrc} alt="Photo" width="50" height="50" />
    //             </td>
    //         </tr>
    //     </tbody>
    // </table>)
}
