import React from "react";

import Image from "./Image";

export const empty = () => <Image onChange={() => {}} />;
export const full = () => <Image value="https://placehold.it/256x256" onChange={() => {}} />;
export const broken = () => <Image value="https://placeold.it/256x256" onChange={() => {}} />;

export default {title: "Image"};
