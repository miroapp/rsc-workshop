import { cookies } from "next/headers";
import Image from "next/image";
import congratulations from "../public/congratulations.png";
import { fetchBoards } from "../src/utils/fetch/boards";
import Link from "next/link";
import React from "react";
import { Board } from "@mirohq/miro-api";
import moment from 'moment';

export default async function HomePage() {
  const nextCookies = cookies();

  let boards: Board[] = [];
  try {
    const response = await fetchBoards(nextCookies);
    if (Array.isArray(response)) {
      boards = response;
    }
  } catch (e) {}

  return (
    <div className="grid wrapper">
      <time>
        {moment().format('MMMM Do YYYY, h:mm:ss a')}
      </time>
      <div className="cs1 ce12">
        <Image
          src={congratulations}
          alt="Congratulations"
          style={{ width: "100%", height: "auto" }}
          priority
        />
      </div>
      <div className="cs1 ce12">
        <h1>Congratulations!</h1>
        <p>
          You've just created your first Nextjs 13 appDir app, and connected it
          to Miro!
        </p>
      </div>
      <div className="cs1 ce12">
        <h2>List all your {boards.length} board(s) here:</h2>
        <ul>
          {!!boards.length &&
            boards?.map((b) => <li key={b.id}> {b.name} </li>)}
        </ul>
      </div>
      <div className="cs1 ce12">
        <p>
          To explore more and build your own app, see the Miro Developer
          Platform documentation.
        </p>
      </div>
      <div className="cs1 ce12">
        <h3>Resources</h3>
        <ul>
          <li>
            <Link target="_blank" href="https://beta.nextjs.org/docs">
              NextJS docs
            </Link>
          </li>
          <li>
            <Link target="_blank" href="https://developers.miro.com">
              Miro API docs
            </Link>
          </li>
          <li>
            <Link
              target="_blank"
              href="https://miroapp.github.io/api-clients/index.html"
            >
              miro-api client docs
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
