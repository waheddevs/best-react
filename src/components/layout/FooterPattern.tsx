import Image from "next/image";

import styles from "@/css/layout/footer.module.css";

export function FooterPattern() {
  return (
    <div aria-hidden="true" className={styles.footer__pattern}>
      <Image
        alt=""
        className={styles.footer__patternImage}
        fill
        sizes="(max-width: 767px) 736px, 1088px"
        src="/icons/logo.svg"
      />
    </div>
  );
}
