import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal, WalletIcon } from "@solana/wallet-adapter-react-ui";
import { useMemo, useCallback, useState, useRef, useEffect } from "react";

export default function SolanaWallet() {
  const { connect, connected, connecting, disconnect, wallet, publicKey } =
    useWallet();
  const { visible, setVisible } = useWalletModal();
  const [copied, setCopied] = useState(false);
  const [active, setActive] = useState(false);

  const base58 = useMemo(() => publicKey?.toBase58(), [publicKey]);
  const ref = useRef(null);

  const copyAddress = useCallback(async () => {
    if (base58) {
      await navigator.clipboard.writeText(base58);
      setCopied(true);
      setActive(false);
      setTimeout(() => setCopied(false), 400);
    }
  }, [base58]);

  const handleDisconnect = useCallback(() => {
    disconnect().then(() => {
      setActive(false);
    });
  });

  const content = useMemo(() => {
    console.log(wallet);
    if (!wallet)
      return (
        <button
          onClick={() => {
            setVisible(true);
            
          }}
          className="js-wallet border-jacarta-100 hover:bg-accent focus:bg-accent group dark:hover:bg-accent flex h-10 w-10 items-center justify-center rounded-full border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            className={
              "fill-jacarta-700 h-4 w-4 transition-colors group-hover:fill-white group-focus:fill-white dark:fill-white"
            }
          >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M22 6h-7a6 6 0 1 0 0 12h7v2a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v2zm-7 2h8v8h-8a4 4 0 1 1 0-8zm0 3v2h3v-2h-3z"></path>
          </svg>
        </button>
      );
    if (connected)
      return (
        <div className="wallet-adapter-dropdown">
          <button
            aria-expanded={true}
            onClick={() => {
              if (active) return setActive(false);
              setActive(true);
            }}
            className="wallet-adapter-button-trigger js-wallet border-jacarta-100 hover:bg-accent focus:bg-accent group dark:hover:bg-accent flex h-10 w-10 items-center justify-center rounded-full border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15]"
          >
            <WalletIcon wallet={wallet} />
          </button>

          {active && (
            <ul
              aria-label="dropdown-list"
              className={`wallet-adapter-dropdown-list wallet-adapter-dropdown-list-active
            `}
              ref={ref}
              role="menu"
            >
              <li
                onClick={copyAddress}
                className="wallet-adapter-dropdown-list-item"
                role="menuitem"
              >
                {copied ? "Copied" : "Copy address"}
              </li>

              <li
                onClick={handleDisconnect}
                className="wallet-adapter-dropdown-list-item"
                role="menuitem"
              >
                Disconnect
              </li>
            </ul>
          )}
        </div>
      );
    else
      return (
        <button className="js-wallet border-jacarta-100 hover:bg-accent focus:bg-accent group dark:hover:bg-accent flex h-10 w-10 items-center justify-center rounded-full border bg-white transition-colors hover:border-transparent focus:border-transparent dark:border-transparent dark:bg-white/[.15]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            className={
              "fill-jacarta-700 h-4 w-4 transition-colors group-hover:fill-white group-focus:fill-white dark:fill-white"
            }
          >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M22 6h-7a6 6 0 1 0 0 12h7v2a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v2zm-7 2h8v8h-8a4 4 0 1 1 0-8zm0 3v2h3v-2h-3z"></path>
          </svg>
        </button>
      );
  }, [connected, wallet, active, copied]);

  useEffect(() => {
    if (!wallet) setVisible(true);
  }, []);

  return content;
}
