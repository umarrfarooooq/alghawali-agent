"use client";

import { useState, useEffect } from "react";
import { UnstyledButton, Menu, Group } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import classes from "./LanguagePicker.module.css";
import { GB, MM, NP, IN, ID} from "country-flag-icons/react/3x2";

const data = [
  { label: "English", code: "en", Flag: GB },
  { label: "Burmese", code: "my", Flag: MM },
  { label: "Nepalese", code: "ne", Flag: NP },
  { label: "Hindi", code: "in", Flag: IN },
  { label: "Indonesian", code: "id", Flag: ID },
];

export function LanguagePicker() {
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1];
  const [opened, setOpened] = useState(false);
  const [selected, setSelected] = useState(data[0]);

  useEffect(() => {
    const matchedLocale = data.find((item) => item.code === currentLocale) || data[0];
    setSelected(matchedLocale);
  }, [currentLocale]);

  const handleLanguageChange = (item) => {
    setSelected(item);
    window.location.href = `/${item.code}${pathname.substring(3)}`
  };

  const items = data.map((item) => (
    <Menu.Item onClick={() => handleLanguageChange(item)} key={item.label}>
      <Group gap="xs">
        <span>
          <item.Flag className={`${classes.flag} h-4 w-4`} />
        </span>
        <span>{item.label}</span>
      </Group>
    </Menu.Item>
  ));

  return (
    <Menu
      onOpen={() => setOpened(true)}
      onClose={() => setOpened(false)}
      radius="md"
      width="target"
      withinPortal
    >
      <Menu.Target>
        <UnstyledButton className={classes.control} data-expanded={opened || undefined}>
          <Group gap="xs" className="flex items-center gap-2">
            <selected.Flag className={`${classes.flag} h-4 w-4`} />
            <span className={classes.label}>{selected.label}</span>
          </Group>
          <IconChevronDown size="1rem" className={classes.icon} stroke={1.5} />
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>{items}</Menu.Dropdown>
    </Menu>
  );
}
