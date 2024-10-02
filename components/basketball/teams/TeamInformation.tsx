"use client"; // 指定这是一个客户端组件

import React, { useState } from "react";
import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import Custom404 from "@/components/404";

interface Team {
  id: string;
  name: string;
  shortname: string;
  email?: string;
  captain?: string;
  tel?: string;
  wechat?: string;
  description?: string;
  logosrc?: string;
  photosrc?: string;
}

interface TeamInformationProps {
  team: Team;
  seasonName?: string;
  otherTeams?: Team[];
  showDetails?: boolean; // 控制是否显示详细信息
}

const TeamInformation: React.FC<TeamInformationProps> = ({
  team,
  seasonName,
  otherTeams,
  showDetails = false, // 默认为不显示详细信息
}) => {
  const [imageLoadingError, setImageLoadingError] = useState(false);

  // 如果球队信息不存在，显示404页面
  if (!team) {
    return <Custom404 />;
  }

  return (
    <section>
      {/* 返回按钮 */}
      <button onClick={() => window.history.back()}>返回到队伍列表</button>

      <Card key={team.id} className="relative" isPressable>
        {/* 卡片头部显示球队名称 */}
        <CardHeader className="text-center">
          <h1>
            {team.name} ({team.shortname})
          </h1>
          {/* 如果有赛季名称，则显示 */}
          {seasonName && <h2>赛季: {seasonName}</h2>}
        </CardHeader>

        {/* 卡片主体显示球队的详细信息 */}
        <CardBody className="text-center">
          {/* 球队Logo */}
          <Image
            src={team.logosrc}
            alt={`${team.name} logo`}
            width={100}
            height={100}
            onError={() => setImageLoadingError(true)}
          />
          {imageLoadingError && <p>图片加载失败</p>}

          <h4>{team.name}</h4>
          <p>{team.description}</p>

          {/* 显示更多详细信息 */}
          {showDetails && (
            <>
              <p>队长: {team.captain}</p>
              <p>电子邮件: {team.email}</p>
              <p>电话: {team.tel}</p>
              <p>微信: {team.wechat}</p>
            </>
          )}
        </CardBody>
      </Card>

      {/* 如果有其他球队列表 */}
      {otherTeams && (
        <div className="mt-8">
          <h3>其他球队:</h3>
          <ul>
            {otherTeams.map((otherTeam, index) => (
              <li key={index}>{otherTeam.name}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default TeamInformation;
