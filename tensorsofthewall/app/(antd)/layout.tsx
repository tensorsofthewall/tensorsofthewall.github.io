import { AntdRegistry } from "@ant-design/nextjs-registry";

export default function AntdLayout({ children }: { children: React.ReactNode }) {
  return <AntdRegistry>{children}</AntdRegistry>;
}
