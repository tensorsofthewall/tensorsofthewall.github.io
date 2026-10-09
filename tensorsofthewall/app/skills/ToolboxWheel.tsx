import Image from "next/image";
import badges from "./badges";
import styles from "./wheel.module.css";

const sizes = "104px";

function Badge({ name }: { name: string }) {
    return <Image src={badges[name]} alt={name} fill sizes={sizes} style={{ objectFit: "contain" }} unoptimized />;
}

/** Decorative summary of the core toolbox. The real detail lives in the capability sections. */
export default function ToolboxWheel({ names }: { names: string[] }) {
    return (
        <>
            <div className={styles.stage} aria-hidden="true">
                {names.map((name, i) => (
                    <div
                        key={name}
                        className={styles.rider}
                        style={{ "--i": i, "--n": names.length } as React.CSSProperties}
                    >
                        <div className={styles.holder}>
                            <div className={styles.badge} style={{ "--i": i, "--n": names.length } as React.CSSProperties}>
                                <Badge name={name} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* Shown instead of the wheel when the visitor prefers reduced motion. */}
            <ul className={styles.static} aria-label="Core toolbox">
                {names.map((name) => (
                    <li key={name} className={styles.staticItem}>
                        <Badge name={name} />
                    </li>
                ))}
            </ul>
        </>
    );
}
