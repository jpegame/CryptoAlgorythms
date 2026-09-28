import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Cifras Clássicas de Criptografia",
      version: "1.0.0",
      description:
        "Documentação das APIs de criptografia e decriptação: César, Vigenère, OTP e Hill."
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor Local"
      }
    ],
    paths: {
      "/api/caesar/encrypt": {
        post: {
          summary: "Cifra de César - Criptografar",
          tags: ["Cifra de César"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    text: { type: "string", example: "HELLO WORLD" },
                    shift: { type: "integer", example: 3 }
                  },
                  required: ["text", "shift"]
                }
              }
            }
          },
          responses: {
            200: {
              description: "Sucesso",
              content: {
                "application/json": {
                  schema: { type: "object", properties: { result: { type: "string", example: "KHOOR ZRUOG" } } }
                }
              }
            },
            400: { description: "Erro de validação" }
          }
        }
      },
      "/api/caesar/decrypt": {
        post: {
          summary: "Cifra de César - Decriptar",
          tags: ["Cifra de César"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    text: { type: "string", example: "KHOOR ZRUOG" },
                    shift: { type: "integer", example: 3 }
                  },
                  required: ["text", "shift"]
                }
              }
            }
          },
          responses: {
            200: {
              description: "Sucesso",
              content: {
                "application/json": {
                  schema: { type: "object", properties: { result: { type: "string", example: "HELLO WORLD" } } }
                }
              }
            },
            400: { description: "Erro de validação" }
          }
        }
      },
      "/api/vigenere/encrypt": {
        post: {
          summary: "Cifra de Vigenère - Criptografar",
          tags: ["Cifra de Vigenère"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    text: { type: "string", example: "HELLO WORLD" },
                    key: { type: "string", example: "LEMON" }
                  },
                  required: ["text", "key"]
                }
              }
            }
          },
          responses: {
            200: {
              description: "Sucesso",
              content: {
                "application/json": {
                  schema: { type: "object", properties: { result: { type: "string", example: "SIXZB HSDZQ" } } }
                }
              }
            },
            400: { description: "Erro de validação" }
          }
        }
      },
      "/api/vigenere/decrypt": {
        post: {
          summary: "Cifra de Vigenère - Decriptar",
          tags: ["Cifra de Vigenère"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    text: { type: "string", example: "SIXZB HSDZQ" },
                    key: { type: "string", example: "LEMON" }
                  },
                  required: ["text", "key"]
                }
              }
            }
          },
          responses: {
            200: {
              description: "Sucesso",
              content: {
                "application/json": {
                  schema: { type: "object", properties: { result: { type: "string", example: "HELLO WORLD" } } }
                }
              }
            },
            400: { description: "Erro de validação" }
          }
        }
      },
      "/api/otp/encrypt": {
        post: {
          summary: "One-Time Pad (OTP) - Criptografar",
          tags: ["One-Time Pad (OTP)"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    text: { type: "string", example: "HELLO" },
                    key: { type: "string", description: "Opcional: chave customizada com o mesmo tamanho do texto", example: "XMCKL" }
                  },
                  required: ["text"]
                }
              }
            }
          },
          responses: {
            200: {
              description: "Sucesso",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      cipherTextHex: { type: "string", example: "10080f0703" },
                      keyHex: { type: "string", example: "584d434b4c" }
                    }
                  }
                }
              }
            },
            400: { description: "Erro de validação" }
          }
        }
      },
      "/api/otp/decrypt": {
        post: {
          summary: "One-Time Pad (OTP) - Decriptar",
          tags: ["One-Time Pad (OTP)"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    cipherTextHex: { type: "string", example: "10080f0703" },
                    keyHex: { type: "string", example: "584d434b4c" }
                  },
                  required: ["cipherTextHex", "keyHex"]
                }
              }
            }
          },
          responses: {
            200: {
              description: "Sucesso",
              content: {
                "application/json": {
                  schema: { type: "object", properties: { result: { type: "string", example: "HELLO" } } }
                }
              }
            },
            400: { description: "Erro de validação" }
          }
        }
      },
      "/api/hill/encrypt": {
        post: {
          summary: "Cifra de Hill - Criptografar",
          tags: ["Cifra de Hill"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    text: { type: "string", example: "HELLOMATRIX" },
                    keyMatrix: {
                      type: "array",
                      items: { type: "array", items: { type: "integer" } },
                      example: [[5, 8], [17, 3]]
                    }
                  },
                  required: ["text", "keyMatrix"]
                }
              }
            }
          },
          responses: {
            200: {
              description: "Sucesso",
              content: {
                "application/json": {
                  schema: { type: "object", properties: { result: { type: "string", example: "PBNMKOWFTBNS" } } }
                }
              }
            },
            400: { description: "Erro de validação" }
          }
        }
      },
      "/api/hill/decrypt": {
        post: {
          summary: "Cifra de Hill - Decriptar",
          tags: ["Cifra de Hill"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    text: { type: "string", example: "PBNMKOWFTBNS" },
                    keyMatrix: {
                      type: "array",
                      items: { type: "array", items: { type: "integer" } },
                      example: [[5, 8], [17, 3]]
                    }
                  },
                  required: ["text", "keyMatrix"]
                }
              }
            }
          },
          responses: {
            200: {
              description: "Sucesso",
              content: {
                "application/json": {
                  schema: { type: "object", properties: { result: { type: "string", example: "HELLOMATRIXX" } } }
                }
              }
            },
            400: { description: "Erro de validação" }
          }
        }
      }
    }
  },
  apis: []
};

export const swaggerSpec = swaggerJSDoc(options);