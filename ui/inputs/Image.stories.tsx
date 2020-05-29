import React from "react";

import Image from "./Image";

export const empty = () => <Image onChange={() => {}} />;
export const full = () => <Image value="https://placehold.it/256x256" onChange={() => {}} />;
export const wide = () => (
  <Image height={32} value="https://placehold.it/256x256" width={64} onChange={() => {}} />
);
export const broken = () => <Image value="https://placeold.it/256x256" onChange={() => {}} />;

export default {title: "UI/Inputs/Image"};
