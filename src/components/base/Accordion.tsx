import React, { useState } from "react";
import styled from "styled-components";

type AccordionItem = {
  title: string
  content: string
}

const Title = styled.h3`
  padding: 1rem 0;
  border-top: 1px solid rgba(0, 0, 0, .1);
  border-bottom: 1px solid rgba(0, 0, 0, .1);
  cursor: pointer;
  transition: .25s; 

  &:hover {
    background: #fafafa;
  }
`

const Content = styled.div<{ expanded?: boolean; }>`
  display: none;
  ${(props) => props.expanded && `display: block;`}
`

export default function Accordion({ items }: { items: AccordionItem[] }) {
  const [expandedItem, setExpandedItem] = useState<number | null>(null)

  return (
    <div>
      {items.map(({ title, content }, index) => (
        <>
          <Title
            onClick={() => setExpandedItem(expandedItem === index ? null : index)}
          >
            {title}
          </Title>
          <Content
            expanded={index === expandedItem}
          >{content}</Content>
        </>
      ))}
    </div>
  );
}
