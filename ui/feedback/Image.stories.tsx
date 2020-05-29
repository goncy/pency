import React from "react";

import Image from "./Image";

export const base = () => <Image height={160} src="http://placehold.it/480x320" width={240} />;
export const broken = () => <Image height={160} src="http://placeold.it/480x320" width={240} />;
export const resized = () => <Image height={240} src="http://placehold.it/480x320" width={160} />;

export default {title: "UI/Feedback/Image"};
