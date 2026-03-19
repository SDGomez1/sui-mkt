import TrackedRedirectClient from "@/components/redirects/TrackedRedirectClient";

const REDIRECT_TARGET = "https://www.skool.com/conecta-con-dios-2729/about";
const EVENT_NAME = "skool_about_opened";

export default function SkoolRedirectClient() {
  return (
    <TrackedRedirectClient
      destination={REDIRECT_TARGET}
      eventName={EVENT_NAME}
    />
  );
}
