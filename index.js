import React, {Fragment} from 'react'

const codeStyle = {
    border: "1px solid #9c9c9c",
    backgroundColor: "#d4d4d4",
    borderRadius: "2px",
    color: "#A94C66",
    fontFamily: "consolas",
    padding: 1
}

export const RenderSlackRichContent = ({elements}) => {
    const makeStyledText = (subElement, list = false, index) => {
        const IsLink = subElement.type === "link" ? 'a' : 'span'
        const Content = () => subElement.text === "\\n" ?
            <br/>
            :
            <IsLink
                href={subElement.url}
                dangerouslySetInnerHTML={{__html: subElement.text.replace(/\n/g, '<br/>')}}
                style={{
                    fontStyle: subElement.style && subElement.style.italic ? "italic" : "normal",
                    fontWeight: subElement.style && subElement.style.bold ? "bold" : "normal",
                    textDecoration: subElement.style && subElement.style.strike ? "line-through" : "none",
                    ...(subElement.style && subElement.style.code ? codeStyle : {})
                }}
            />
        return list ? (
            <li>
                <Content/>
            </li>
        ) : (
            <Fragment>
                <Content/>
            </Fragment>
        )
    }

    const makeStyledCodeBlock = (subElement, list) => (
        <pre>
            {makeStyledText(subElement, !!list)}
        </pre>
    )

    const RenderHTML = ({elements, list}) => {
        const html = []
        elements.forEach((element, index) => {
            if (element.type === "rich_text_section") {
                element.elements.forEach(subElement => {
                    html.push(makeStyledText(subElement, !!list, index))
                })
            } else if (element.type === "rich_text_preformatted") {
                html.push(
                    <pre key={"code"+index}>
                        {element.elements.forEach(subElement => makeStyledCodeBlock(subElement, !!list))}
                    </pre>
                )
            } else if (element.type === "rich_text_list") {
                if(element.style === "ordered"){
                    html.push(<ol key={"list"+index}><RenderHTML elements={element.elements} list/></ol>)
                } else {
                    html.push(<ul key={"list"+index}><RenderHTML elements={element.elements} list/></ul>)
                }
            }
        })
        return html
    }

    return (
        <RenderHTML elements={elements}/>
    )
}

/*
{
  "blocks":[
    {
      "type":"rich_text",
      "block_id":"s4EJ",
      "elements":[
        {
          "type":"rich_text_section",
          "elements":[
            {
              "type":"text",
              "text":"Formats:\nPlain text\n"
            },
            {
              "type":"text",
              "text":"Bold text",
              "style":{
                "bold":true
              }
            },
            {
              "type":"text",
              "text":"\n"
            },
            {
              "type":"text",
              "text":"Italic text",
              "style":{
                "italic":true
              }
            },
            {
              "type":"text",
              "text":"\n"
            },
            {
              "type":"text",
              "text":"Strikethrough text",
              "style":{
                "strike":true
              }
            },
            {
              "type":"text",
              "text":"\n"
            },
            {
              "type":"text",
              "text":"Code text",
              "style":{
                "code":true
              }
            },
            {
              "type":"text",
              "text":"\n"
            }
          ]
        },
        {
          "type":"rich_text_preformatted",
          "elements":[
            {
              "type":"text",
              "text":"block code text"
            }
          ]
        },
        {
          "type":"rich_text_section",
          "elements":[
            {
              "type":"link",
              "url":"http://google.com",
              "text":"A link"
            },
            {
              "type":"text",
              "text":"\n"
            }
          ]
        },
        {
          "type":"rich_text_list",
          "elements":[
            {
              "type":"rich_text_section",
              "elements":[
                {
                  "type":"text",
                  "text":"An"
                }
              ]
            },
            {
              "type":"rich_text_section",
              "elements":[
                {
                  "type":"text",
                  "text":"Ordered"
                }
              ]
            },
            {
              "type":"rich_text_section",
              "elements":[
                {
                  "type":"text",
                  "text":"List"
                }
              ]
            }
          ],
          "style":"ordered",
          "indent":0
        },
        {
          "type":"rich_text_list",
          "elements":[
            {
              "type":"rich_text_section",
              "elements":[
                {
                  "type":"text",
                  "text":"An"
                }
              ]
            },
            {
              "type":"rich_text_section",
              "elements":[
                {
                  "type":"text",
                  "text":"Unordered"
                }
              ]
            },
            {
              "type":"rich_text_section",
              "elements":[
                {
                  "type":"text",
                  "text":"List"
                }
              ]
            }
          ],
          "style":"bullet",
          "indent":0
        },
        {
          "type":"rich_text_section",
          "elements":[
            {
              "type":"text",
              "text":"Bold, italic, strikethrough text",
              "style":{
                "bold":true,
                "italic":true,
                "strike":true
              }
            },
            {
              "type":"text",
              "text":"\n"
            }
          ]
        },
        {
          "type":"rich_text_list",
          "elements":[
            {
              "type":"rich_text_section",
              "elements":[
                {
                  "type":"text",
                  "text":"Ordered",
                  "style":{
                    "bold":true
                  }
                }
              ]
            },
            {
              "type":"rich_text_section",
              "elements":[
                {
                  "type":"text",
                  "text":"List",
                  "style":{
                    "italic":true
                  }
                }
              ]
            },
            {
              "type":"rich_text_section",
              "elements":[
                {
                  "type":"text",
                  "text":"With",
                  "style":{
                    "strike":true
                  }
                }
              ]
            },
            {
              "type":"rich_text_section",
              "elements":[
                {
                  "type":"text",
                  "text":"Styles",
                  "style":{
                    "code":true
                  }
                },
                {
                  "type":"text",
                  "text":" "
                }
              ]
            }
          ],
          "style":"ordered",
          "indent":0
        }
      ]
    }
  ]
}
 */