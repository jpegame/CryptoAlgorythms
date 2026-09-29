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
      "/api/caesar/attack": {
        post: {
          summary: "Ataque de força bruta e detecção de idioma da cifra de César",
          tags: ["Cifra de César"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { text: { type: "string", example: "KHOOR PB QDPH LV SHGUR" } },
                  required: ["text"]
                }
              }
            }
          },
          responses: {
            200: {
              description: "25 candidatos classificados com idioma provável e confiança",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      best: { type: "object", properties: { shift: { type: "integer", example: 3 }, plaintext: { type: "string", example: "HELLO MY NAME IS PEDRO" }, language: { type: "string", example: "Inglês" }, score: { type: "number" } } },
                      confidence: { type: "string", example: "Alta" },
                      candidates: { type: "array", items: { type: "object" } }
                    }
                  }
                }
              }
            },
            400: { description: "Texto inválido" }
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
                    message: { type: "array", items: { type: "integer", minimum: 0, maximum: 255 }, description: "Bytes decimais da mensagem", example: [72, 69, 76, 76, 79] },
                    key: { type: "array", items: { type: "integer", minimum: 0, maximum: 255 }, description: "Opcional: chave decimal com a mesma quantidade de bytes", example: [88, 77, 67, 75, 76] }
                  },
                  required: ["message"]
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
                      keyHex: { type: "string", example: "584d434b4c" },
                      cipherText: { type: "array", items: { type: "integer" }, example: [16, 8, 15, 7, 3] },
                      key: { type: "array", items: { type: "integer" }, example: [88, 77, 67, 75, 76] }
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
                    cipherText: { type: "array", items: { type: "integer", minimum: 0, maximum: 255 }, example: [16, 8, 15, 7, 3] },
                    key: { type: "array", items: { type: "integer", minimum: 0, maximum: 255 }, example: [88, 77, 67, 75, 76] }
                  },
                  required: ["cipherText", "key"]
                }
              }
            }
          },
          responses: {
            200: {
              description: "Sucesso",
              content: {
                "application/json": {
                  schema: { type: "object", properties: { result: { type: "array", items: { type: "integer" }, example: [72, 69, 76, 76, 79] }, resultText: { type: "string", example: "HELLO" } } }
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
