import { Avatar, Text, Button, Paper } from "@mantine/core";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function MaidProfile({ maid }) {
  const t = useTranslations("ProfileCard");
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1];
  return (
    <Paper radius="md" withBorder p="lg" bg="var(--mantine-color-body)">
      <Avatar
        src={`${process.env.NEXT_PUBLIC_API_URL}${maid.maidImage}`}
        size={120}
        radius={120}
        mx="auto"
      />
      <Text ta="center" fz="lg" fw={500} mt="md">
        {maid.maidName}
      </Text>
      <Text ta="center" c="dimmed" fz="sm">
        {t("status")} •{" "}
        <span
          className={`${
            maid.status === "pending"
              ? "text-[#031D92]"
              : maid.status === "approved"
              ? "text-[#0C8B3F]"
              : "text-[#CD2424]"
          } font-semibold`}
        >
          {maid.status}
        </span>
      </Text>

      <Link href={`${currentLocale}/details/${maid._id}`}>
        <Button variant="default" fullWidth mt="md">
          {t("btn")}
        </Button>
      </Link>
    </Paper>
  );
}
