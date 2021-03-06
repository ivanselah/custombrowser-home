import React, { useEffect, useRef, useState } from "react";
import styles from "./bookmark.module.css";
import Modal from "../modal/modal";

const Bookmark = () => {
  const [clickModal, setClickModal] = useState(false);
  const [bookmark, setBookmark] = useState([
    {
      name: "Google",
      addLink: "https://www.google.com/",
      color: { color: "#4181ee" },
    },
    {
      name: "Naver",
      addLink: "https://www.naver.com/",
      color: { color: "#63ce68" },
    },
    {
      name: "Youtube",
      addLink: "https://www.youtube.com/",
      color: { color: "#dd2c28" },
    },
  ]);

  const onClose = () => {
    setClickModal(false);
  };

  const clickAdd = () => {
    setClickModal(true);
  };

  const delClick = (site) => {
    const temp = bookmark.filter((item) => {
      if (item.name !== site.name) {
        return item;
      }
    });
    setBookmark(temp);
  };

  const colors = [
    "#20bf6b", //
    "#0984e3",
    "#4834d4",
    "#130f40",
    "#fd79a8",
    "#fdcb6e",
    "#d63031",
    "#fc5c65",
    "#fa8231",
    "#B33771",
    "#be2edd",
  ];

  const addCheck = (address) => {
    if (address.includes("https://")) {
      return address;
    } else if (!address.includes("https://")) {
      const temp = `https://${address}`;
      return temp;
    } else if (!address.includes("www.")) {
      const temp = `https://www.${address}`;
      return temp;
    }
  };

  const onParentSave = (name, address) => {
    if (!address || !name) {
      return;
    }
    if (bookmark.length === 10) {
      onClose();
      setTimeout(() => {
        alert("더 이상 추가할 수 없습니다(최대10개)");
      }, 200);
      return;
    }
    let siteName;
    const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/gi;
    const English = /[a-zA-Z]/gi;
    if (korean.test(name)) {
      siteName = `${name.substr(0, 4)}..`;
    } else if (English.test(name)) {
      siteName = `${name.substr(0, 7)}..`;
    }
    const checkedLink = addCheck(address);
    const index = Math.round(Math.random() * 10);
    setBookmark([
      ...bookmark,
      {
        name: siteName,
        addLink: checkedLink,
        color: { color: `${colors[index]}` },
      },
    ]);
  };

  return (
    <>
      <div className={styles.bookmark}>
        {bookmark.map((site, index) => {
          return (
            <div key={index} className={styles.item}>
              {index > 2 && (
                <div
                  className={styles.delButton}
                  onClick={() => delClick(site)}
                >
                  <i className="fas fa-minus-square"></i>
                </div>
              )}
              <a className={styles.link} href={site.addLink} target="_blank">
                <span className={styles.title} style={site.color}>
                  {site.name}
                </span>
              </a>
            </div>
          );
        })}
        <button className={styles.addButton} onClick={clickAdd}>
          <i className="fas fa-plus"></i>
        </button>
      </div>
      {clickModal && <Modal onParentSave={onParentSave} onClose={onClose} />}
    </>
  );
};

export default Bookmark;
