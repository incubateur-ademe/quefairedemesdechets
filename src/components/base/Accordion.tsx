import React, { useState } from "react";
import styled from "styled-components";

type AccordionItem = {
  title: string
  content: string
}

const TitleWrapper = styled.h3`
  margin: 0;
  padding: 0;
`
const Title = styled.button<{ expanded?: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  jutify-content: space-between;
  padding: 1rem;
  cursor: pointer;
  transition: .25s; 
  user-select: none;
  -webkit-user-select: none;
  -webkit-appearance: button;
  background: none;
  border: none;

  &:hover {
    background: #fafafa;
  }

  ${({ expanded }) => expanded && `background: #E3E3FD;`}
`

const Chevron = styled.svg<{ expanded?: boolean }>`
  ---rotation: rotate(180deg);

  width: 10px;
  height: 10px;
  margin-left: auto;
  transition: .25s;
  will-change: transform;
  transform: var(---rotation);
  ${({ expanded }) => expanded && `---rotation: rotate(0deg);`}
`

const AccordionItemWrapper = styled.div`
  border-top: 1px solid rgba(0, 0, 0, .1);
  border-bottom: 1px solid rgba(0, 0, 0, .1);
`


const Content = styled.div<{ expanded?: boolean; }> `
  display: none;
  padding: 1rem;
  ${({ expanded }) => expanded && `display: block;`}
`

export default function Accordion({ items }: { items: AccordionItem[] }) {
  const [expandedItem, setExpandedItem] = useState<number | null>(null)

  return (
    <div>
      {items.map(({ title, content }, index) => {
        const expanded = expandedItem === index
        const id = `accordion-item-${index}`
        return (
          <AccordionItemWrapper>
            <TitleWrapper
            >
              <Title
                expanded={expanded}
                onClick={() => setExpandedItem(expanded ? null : index)}
                aria-expanded={expanded}
                aria-controls={id}
                id={`${id}-button`}
                type="button"
              >
                {title}

                <Chevron expanded={expanded}
                  width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M4.99999 2.21883L1.69999 5.51883L0.757324 4.57616L4.99999 0.333496L9.24266 4.57616L8.29999 5.51883L4.99999 2.21883Z" fill="#000091" />
                </Chevron>
              </Title>
            </TitleWrapper>
            <Content
              aria-labelled-by={`${id}-button`}
              aria-hidden={!expanded}
              id={id}
              expanded={expanded}
            >{content}</Content>
          </AccordionItemWrapper>
        )
      })}
    </div>
  );
}
