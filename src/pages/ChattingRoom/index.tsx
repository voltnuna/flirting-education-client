import React, { useCallback } from "react";
import Header from "@components/Header";
import gravatar from "gravatar";
import { IoIosSend } from "react-icons/io";
import { useParams } from "react-router";

const ChattingRoom = () => {
  const { workspace, channel } = useParams<{
    workspace?: string;
    channel?: string;
  }>();

  const onSubmitHandler = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }, []);

  return (
    <>
      <Header title={`${channel}`} />
      <div className="chat-area">
        <div className="balloons-wrap scrollbar">
          <div className="chat-balloon me">
            <div className="in-a-row profile-wrap">
              <div className="profile-img">
                <img
                  src={gravatar.url("doeun@gmail.com", {
                    s: "70px",
                    d: "monsterid",
                  })}
                  alt={`김도은`}
                />
              </div>
              <span className="profile-username">김도은</span>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
              in eaque deserunt. Quos sunt provident doloremque, et cumque porro
              harum accusantium consequatur amet facilis, nihil, expedita nobis
              libero laborum facere.
              <span className="date">2022.08.15</span>
            </p>
          </div>
          <div className="chat-balloon other">
            <div className="in-a-row profile-wrap">
              <div className="profile-img">
                <img
                  src={gravatar.url("suthehee@gmail.com", {
                    s: "70px",
                    d: "monsterid",
                  })}
                  alt={`홍수희`}
                />
              </div>
              <span className="profile-username">홍수희</span>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
              in eaque deserunt. Quos sunt provident doloremque, et cumque porro
              harum accusantium consequatur amet facilis, nihil, expedita nobis
              libero laborum facere.
              <span className="date">2022.08.15</span>
            </p>
          </div>
          <div className="div-line">
            <strong>2022.08.15</strong>
          </div>
          <div className="chat-balloon me">
            <div className="in-a-row profile-wrap">
              <div className="profile-img">
                <img
                  src={gravatar.url("doeun@gmail.com", {
                    s: "70px",
                    d: "monsterid",
                  })}
                  alt={`김도은`}
                />
              </div>
              <span className="profile-username">김도은</span>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
              in eaque deserunt. Quos sunt provident doloremque, et cumque porro
              harum accusantium consequatur amet facilis, nihil, expedita nobis
              libero laborum facere.
              <span className="date">2022.08.15</span>
            </p>
          </div>
          <div className="chat-balloon other">
            <div className="in-a-row profile-wrap">
              <div className="profile-img">
                <img
                  src={gravatar.url("suthehee@gmail.com", {
                    s: "70px",
                    d: "monsterid",
                  })}
                  alt={`홍수희`}
                />
              </div>
              <span className="profile-username">홍수희</span>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
              in eaque deserunt. Quos sunt provident doloremque, et cumque porro
              harum accusantium consequatur amet facilis, nihil, expedita nobis
              libero laborum facere.
              <span className="date">2022.08.15</span>
            </p>
          </div>
          <div className="chat-balloon me">
            <div className="in-a-row profile-wrap">
              <div className="profile-img">
                <img
                  src={gravatar.url("doeun@gmail.com", {
                    s: "70px",
                    d: "monsterid",
                  })}
                  alt={`김도은`}
                />
              </div>
              <span className="profile-username">김도은</span>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
              in eaque deserunt. Quos sunt provident doloremque, et cumque porro
              harum accusantium consequatur amet facilis, nihil, expedita nobis
              libero laborum facere.
              <span className="date">2022.08.15</span>
            </p>
          </div>
          <div className="chat-balloon other">
            <div className="in-a-row profile-wrap">
              <div className="profile-img">
                <img
                  src={gravatar.url("suthehee@gmail.com", {
                    s: "70px",
                    d: "monsterid",
                  })}
                  alt={`홍수희`}
                />
              </div>
              <span className="profile-username">홍수희</span>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
              in eaque deserunt. Quos sunt provident doloremque, et cumque porro
              harum accusantium consequatur amet facilis, nihil, expedita nobis
              libero laborum facere.
              <span className="date">2022.08.15</span>
            </p>
          </div>
          <div className="chat-balloon me">
            <div className="in-a-row profile-wrap">
              <div className="profile-img">
                <img
                  src={gravatar.url("doeun@gmail.com", {
                    s: "70px",
                    d: "monsterid",
                  })}
                  alt={`김도은`}
                />
              </div>
              <span className="profile-username">김도은</span>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
              in eaque deserunt. Quos sunt provident doloremque, et cumque porro
              harum accusantium consequatur amet facilis, nihil, expedita nobis
              libero laborum facere.
              <span className="date">2022.08.15</span>
            </p>
          </div>
          <div className="chat-balloon other">
            <div className="in-a-row profile-wrap">
              <div className="profile-img">
                <img
                  src={gravatar.url("suthehee@gmail.com", {
                    s: "70px",
                    d: "monsterid",
                  })}
                  alt={`홍수희`}
                />
              </div>
              <span className="profile-username">홍수희</span>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
              in eaque deserunt. Quos sunt provident doloremque, et cumque porro
              harum accusantium consequatur amet facilis, nihil, expedita nobis
              libero laborum facere.
              <span className="date">2022.08.15</span>
            </p>
          </div>
          <div className="chat-balloon me">
            <div className="in-a-row profile-wrap">
              <div className="profile-img">
                <img
                  src={gravatar.url("doeun@gmail.com", {
                    s: "70px",
                    d: "monsterid",
                  })}
                  alt={`김도은`}
                />
              </div>
              <span className="profile-username">김도은</span>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
              in eaque deserunt. Quos sunt provident doloremque, et cumque porro
              harum accusantium consequatur amet facilis, nihil, expedita nobis
              libero laborum facere.
              <span className="date">2022.08.15</span>
            </p>
          </div>
          <div className="chat-balloon other">
            <div className="in-a-row profile-wrap">
              <div className="profile-img">
                <img
                  src={gravatar.url("suthehee@gmail.com", {
                    s: "70px",
                    d: "monsterid",
                  })}
                  alt={`홍수희`}
                />
              </div>
              <span className="profile-username">홍수희</span>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
              in eaque deserunt. Quos sunt provident doloremque, et cumque porro
              harum accusantium consequatur amet facilis, nihil, expedita nobis
              libero laborum facere.
              <span className="date">2022.08.15</span>
            </p>
          </div>
          <div className="chat-balloon me">
            <div className="in-a-row profile-wrap">
              <div className="profile-img">
                <img
                  src={gravatar.url("doeun@gmail.com", {
                    s: "70px",
                    d: "monsterid",
                  })}
                  alt={`김도은`}
                />
              </div>
              <span className="profile-username">김도은</span>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
              officia amet blanditiis quo, illum voluptates dolorem maiores
              ratione asperiores veniam accusamus mollitia est ea ipsum possimus
              quis eveniet tenetur nulla pariatur quibusdam repudiandae! Nobis,
              harum recusandae minus hic tempora quod nulla modi ratione cumque.
              Cumque, tempore sunt placeat qui, nobis recusandae pariatur error
              quibusdam impedit consequuntur, quis id voluptatum harum deserunt
              possimus inventore quasi officia rem similique. Eos dolores,
              exercitationem modi quibusdam expedita rerum voluptate tempore
              optio quae labore dolor consequuntur dolore obcaecati magni sint?
              Harum at quisquam esse repellendus nulla dolore, natus
              voluptatibus mollitia incidunt iste nihil laboriosam atque tempore
              maxime labore pariatur rem quas, reiciendis ducimus facilis
              reprehenderit nemo vitae? Sequi autem vero, eveniet recusandae
              ipsam rerum dignissimos temporibus cum fuga ea voluptatum tempora
              natus ad porro architecto nostrum. Nisi, nam. At nesciunt alias
              officia similique molestiae minima, est ex praesentium tenetur
              voluptas dicta, officiis animi excepturi illo aspernatur. Libero,
              doloribus rem. Inventore tempora deleniti necessitatibus ipsum
              voluptatibus! Exercitationem quo velit quam, itaque mollitia
              eveniet, nisi dicta cupiditate et numquam repellat quod
              distinctio, error odio modi veniam labore. Quasi, rerum quia vero,
              dicta quos assumenda quo atque architecto odit dolores accusamus
              labore delectus temporibus est nam molestias praesentium vel
              tempore magni officiis suscipit porro quisquam voluptas saepe.
              Nobis, sint id fugiat assumenda tempore magnam illo adipisci
              repellat, minima consequatur voluptates facilis accusantium
              dolorem? Ea harum magni facere sunt odio illum eaque, quod
              aspernatur commodi quasi cum suscipit? Quis alias, laborum
              deleniti numquam ad impedit adipisci. Inventore repudiandae neque
              officia unde dolorem atque asperiores, et labore, quam ad optio
              tempora fuga repellat? Distinctio quisquam fuga fugiat facilis quo
              nesciunt molestiae dolorum reprehenderit qui adipisci
              exercitationem odio non totam voluptas, a dolores sequi ad
              dignissimos ex quis repellat laborum ullam repudiandae temporibus.
              Quod nostrum, vitae enim dolores voluptatum ut reiciendis.
              <span className="date">2022.08.15</span>
            </p>
          </div>
          <div className="chat-balloon other">
            <div className="in-a-row profile-wrap">
              <div className="profile-img">
                <img
                  src={gravatar.url("suthehee@gmail.com", {
                    s: "70px",
                    d: "monsterid",
                  })}
                  alt={`홍수희`}
                />
              </div>
              <span className="profile-username">홍수희</span>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
              in eaque deserunt. Quos sunt provident doloremque, et cumque porro
              harum accusantium consequatur amet facilis, nihil, expedita nobis
              libero laborum facere.
              <span className="date">2022.08.15</span>
            </p>
          </div>
        </div>
        <div className="chatbox-wrapper">
          <form action="" onSubmit={onSubmitHandler} className="in-a-row">
            <textarea name="" id="" rows={1}></textarea>
            <button type="submit">
              <IoIosSend size="20" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChattingRoom;
