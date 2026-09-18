import Image from "next/image";

export function FooterPattern() {
  return (
    <div aria-hidden="true" className="footer__pattern">
      <Image
        alt=""
        className="footer__patternImage"
        fill
        sizes="(max-width: 767px) 736px, 1088px"
        src="/icons/logo.svg"
      />
    </div>
  );
}
