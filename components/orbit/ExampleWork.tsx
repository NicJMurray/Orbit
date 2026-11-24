"use client";

import { useRef, useState } from "react";
import { AUDIT_URL, CASES } from "../../lib/site-content";

export function ExampleWork() {
  const dialog = useRef<HTMLDialogElement>(null);
  const previous = useRef<HTMLButtonElement | null>(null);
  const [current, setCurrent] = useState<(typeof CASES)[number]>(CASES[0]);

  return (
    <>
      <div className="case-grid">
        {CASES.map(item => (
          <article className={"case-card case-" + item.id} key={item.id}>
            <div className="case-image">
              <img src={item.image} alt={item.imageAlt} loading="lazy" decoding="async" />
              <span className="case-genre">{item.category}</span>
            </div>
            <div className="case-copy">
              <p className="case-brand">{item.name}{item.id === "alder" && <span>Full demo</span>}</p>
              <h3>{item.headline}</h3>
              <p>{item.summary}</p>
              <button className="underlink" type="button" onClick={(e) => {
                previous.current = e.currentTarget;
                setCurrent(item);
                dialog.current?.showModal();
              }} aria-label={"View " + item.name + " example"}>View example</button>
            </div>
          </article>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="case-dialog"
        aria-labelledby="case-modal-brand"
        onClose={() => previous.current?.focus()}
        onClick={e => { if (e.target === e.currentTarget) e.currentTarget.close(); }}
      >
        <div className="case-dialog-inner">
          <div className="case-dialog-top">
            <p className="eyebrow">{current.category} · Fictional example</p>
            <button type="button" className="dialog-close" aria-label="Close example" onClick={() => dialog.current?.close()}>
              <svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>
            </button>
          </div>
          <h2 id="case-modal-brand">{current.name}</h2>
          <p className="case-intent">{current.brief}</p>
          <div className="case-insight"><span>What the audit found</span><p>{current.finding}</p></div>
          <div className="case-insight"><span>What to do next</span><p>{current.action}</p></div>
          {current.openDemo ? (
            <a className="button button-lime" href={AUDIT_URL} target="_blank" rel="noopener">Open the full sample audit</a>
          ) : <a className="button button-lime" href="/contact">Discuss an audit</a>}
        </div>
      </dialog>
    </>
  );
}
